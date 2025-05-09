<?php
// filepath: c:\GeoDS\software\_programs\xampp\htdocs\finalproject\api\getHikingRoute.php
header('Content-Type: application/json');

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $trailName = $input['routeName'] ?? ''; // Match 'trailname' column

    // Database connection
    require 'db_connect.php';

    // Query the hiking route data
    $stmt = $pdo->prepare("
        SELECT 
            ST_AsGeoJSON(ST_Transform(geom, 4326)) AS geojson,
            trailname,
            difficulty,
            region,
            pigrisk
        FROM hikingroute
        WHERE (trailname = :trailName OR :trailName = '')
    ");
    $stmt->execute([
        ':trailName' => $trailName
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