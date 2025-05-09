<?php
header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $water = $input['waterSource'] ?? 'All'; // Match 'water' column
    $tent = $input['tentSpace'] ?? 'All'; // Match 'tent' column
    $pigrisk = $input['wildlifeRisk'] ?? 'All'; // Match 'pigrisk' column

    // Database connection
    require 'db_connect.php';

    // Query the campsite data
    $stmt = $pdo->prepare("
        SELECT 
            ST_AsGeoJSON(geom) AS geojson,
            campname,
            water,
            tent,
            pigrisk
        FROM campsite
        WHERE (water = :water OR :water = 'All')
          AND (tent = :tent OR :tent = 'All')
          AND (pigrisk = :pigrisk OR :pigrisk = 'All')
    ");
    $stmt->execute([
        ':water' => $water,
        ':tent' => $tent,
        ':pigrisk' => $pigrisk
    ]);

    $camp = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $feature = json_decode($row['geojson'], true);
        $feature['properties'] = [
            'campname' => $row['campname'],
            'water' => $row['water'],
            'tent' => $row['tent'],
            'pigrisk' => $row['pigrisk']
        ];
        $camp[] = $feature;
    }

    echo json_encode(['success' => true, 'campGeoJSON' => ['type' => 'FeatureCollection', 'features' => $camp]]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>