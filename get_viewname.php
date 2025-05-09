<?php
//1. 数据库表假设
//假设你的 PostgreSQL数据库中有一个表 routes其中有一列 route_name 存储路线名称

//2. 后端代码（PHP 示例）
//创建一个 PHP 文件（例如 get_routes.php），从数据库中获取数据并生成 <option> 元素：
// filepath: c:\GeoDS\software\_programs\xampp\htdocs\finalproject\get_routes.php

// 数据库连接配置
require 'db_connect.php';

try {
    // 查询路线名称
    $query = "SELECT DISTINCT viewname FROM viewingpoint";
    $stmt = $pdo->query($query);

    // 输出 <option> 元素
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<option value=\"" . htmlspecialchars($row['viewname']) . "\"></option>";
    }
} catch (PDOException $e) {
    // 错误处理
    echo "Error: " . $e->getMessage();
}
?>