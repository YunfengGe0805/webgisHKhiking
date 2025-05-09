<?php
header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $pigrisk = $input['wildlifeRisk'] ?? 'All'; // Match 'pigRisk' column

    // Database connection
    require 'db_connect.php';

    // Query the attraction data
    $stmt = $pdo->prepare("
        SELECT 
            ST_AsGeoJSON(geom) AS geojson,
            attname,
            pigrisk
        FROM attraction
        WHERE (pigrisk = :pigrisk OR :pigrisk = 'All')
    ");
    $stmt->execute([
        ':pigrisk' => $pigrisk
    ]);

    $attr = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $feature = json_decode($row['geojson'], true);
        $feature['properties'] = [
            'attname' => $row['attname'],
            'pigrisk' => $row['pigrisk']
        ];
        $attr[] = $feature;
    }

    echo json_encode(['success' => true, 'attractionGeoJSON' => ['type' => 'FeatureCollection', 'features' => $attr]]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>


