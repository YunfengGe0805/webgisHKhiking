<?php
require 'db_connect.php';

try {
    $stmt = $pdo->query("SELECT 1");
    echo json_encode(['success' => true, 'message' => 'yeah']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>