<?php
header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $pigrisk = $input['wildlifeRisk'] ?? 'All'; // Match 'pigrisk' column

    // Database connection
    require 'db_connect.php';

    // Query the viewpoint data
    $stmt = $pdo->prepare("
        SELECT 
            ST_AsGeoJSON(geom) AS geojson,
            viewname,
            pigrisk
        FROM viewingpoint
        WHERE (pigrisk = :pigrisk OR :pigrisk = 'All')
    ");
    $stmt->execute([
        ':pigrisk' => $pigrisk
    ]);

    $view = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $feature = json_decode($row['geojson'], true);
        $feature['properties'] = [
            'viewname' => $row['viewname'],
            'pigrisk' => $row['pigrisk']
        ];
        $view[] = $feature;
    }

    echo json_encode(['success' => true, 'viewGeoJSON' => ['type' => 'FeatureCollection', 'features' => $view]]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>