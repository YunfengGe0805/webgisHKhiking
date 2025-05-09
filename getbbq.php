<?php
header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $pigrisk = $input['wildlifeRisk'] ?? 'All'; // Match 'pigrisk' column

    // Database connection
    require 'db_connect.php';

    // Query the BBQ site data
    $stmt = $pdo->prepare("
        SELECT 
            ST_AsGeoJSON(geom) AS geojson,
            bbqname,
            pigrisk
        FROM barbequesite
        WHERE (pigrisk = :pigrisk OR :pigrisk = 'All')
    ");
    $stmt->execute([
        ':pigrisk' => $pigrisk
    ]);

    $bbq = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $feature = json_decode($row['geojson'], true);
        $feature['properties'] = [
            'bbqname' => $row['bbqname'],
            'pigrisk' => $row['pigrisk']
        ];
        $bbq[] = $feature;
    }

    echo json_encode(['success' => true, 'bbqGeoJSON' => ['type' => 'FeatureCollection', 'features' => $bbq]]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>