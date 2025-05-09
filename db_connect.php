<?php
$host = '127.0.0.1';
$port = '11741'; 
$db   = 'hikingDB';
$user = 'postgres';
$pass = 'iAmTheBoss'; 


$dsn = "pgsql:host=$host;port=$port;dbname=$db";
$pdo = new PDO($dsn, $user, $pass);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>