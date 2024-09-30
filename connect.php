<?php

    $email = $_POST['email'];
    $password = $_POST['password'];

    if (empty($email) || empty($password)) {
        die('Error: Email or password cannot be empty.');
    }

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $conn = new mysqli('localhost', 'root', '', 'test');

    if ($conn->connect_error) {
        die('Connection Failed: ' . $conn->connect_error);
    } else {

        $stmt = $conn->prepare("INSERT INTO registration (email, password) VALUES (?, ?)");
        
       
        $stmt->bind_param("ss", $email, $hashed_password);
        
       
        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Error during registration: " . $stmt->error;
        }

       
        $stmt->close();
        $conn->close();
    }
?>