<?php
header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $campname = $input['campName'] ?? ''; // Match 'campname' column

    // Database connection
    require 'db_connect.php';

    // Query the campsite data
    $stmt = $pdo->prepare("
        SELECT 
            ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geojson,
            campname,
            water,
            tent,
            pigrisk
        FROM campsite
        WHERE (campname = :campname OR :campname = '')
    ");
    $stmt->execute([
        ':campname' => $campname
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