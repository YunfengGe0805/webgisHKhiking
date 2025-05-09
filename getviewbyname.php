<?php
header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $viewname = $input['viewName'] ?? ''; // Match 'viewname' column

    // Database connection
    require 'db_connect.php';

    // Query the viewpoint data
    $stmt = $pdo->prepare("
        SELECT 
            ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geojson,
            viewname,
            pigrisk
        FROM viewingpoint
        WHERE (viewname = :viewname OR :viewname = '')
    ");
    $stmt->execute([
        ':viewname' => $viewname
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