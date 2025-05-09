<?php
header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $bbqname = $input['bbqName'] ?? ''; // Match 'bbqname' column

    // Database connection
    require 'db_connect.php';

    // Query the BBQ site data
    $stmt = $pdo->prepare("
        SELECT 
            ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geojson,
            bbqname,
            pigrisk
        FROM barbequesite
        WHERE (bbqname = :bbqname OR :bbqname = '')
    ");
    $stmt->execute([
        ':bbqname' => $bbqname
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