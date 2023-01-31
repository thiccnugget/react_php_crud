<?php


require_once 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
date_default_timezone_set('Europe/Rome');


$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;

    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO users(id, name, email, mobile, created_at) VALUES(null, :name, :email, :mobile, :created_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $created_at);

        if($stmt->execute()) {
            $response = 1;
        } else {
            $response = 0;
        }
        echo $response;
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = " UPDATE users SET name= :name, email = :email, mobile = :mobile, updated_at = :updated_at WHERE id = :id ";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d H-i-s');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);

        if($stmt->execute()) {
            $response = 1;
        } else {
            $response = 0;
        }
        echo $response;
        break;

    case "DELETE":
        $sql = "DELETE FROM users WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if($stmt->execute()) {
            $response = 1;
        } else {
            $response = 0;
        }
        echo $response;
        break;
}
