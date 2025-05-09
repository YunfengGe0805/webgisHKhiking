<?php
header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $difficulty = $input['difficulty'] ?? '';
    $region = $input['region'] ?? '';
    $pigrisk = $input['wildlifeRisk'] ?? '';

    // Database connection
    require 'db_connect.php';

    // Query the hiking route data
    $stmt = $pdo->prepare("
        SELECT 
            ST_AsGeoJSON(geom) AS geojson,
            trailname,
            difficulty,
            region,
            pigrisk
        FROM hikingroute
        WHERE (difficulty = :difficulty OR :difficulty = 'All')
          AND (region = :region OR :region = '')
          AND (pigrisk = :pigrisk OR :pigrisk = 'All')
    ");
    $stmt->execute([
        ':difficulty' => $difficulty,
        ':region' => $region,
        ':pigrisk' => $pigrisk
    ]);

    $routes = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $feature = json_decode($row['geojson'], true);
        $feature['properties'] = [
            'trailname' => $row['trailname'],
            'difficulty' => $row['difficulty'],
            'region' => $row['region'],
            'pigrisk' => $row['pigrisk']
        ];
        $routes[] = $feature;
    }

    echo json_encode(['success' => true, 'routeGeoJSON' => ['type' => 'FeatureCollection', 'features' => $routes]]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>