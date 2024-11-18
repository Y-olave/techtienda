<?php
require 'vendor/autoload.php';

use Supabase\CreateClient;

$supabaseUrl = 'https://xcmsqouznwfiyfrwthup.supabase.co';
$supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjbXNxb3V6bndmaXlmcnd0aHVwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTk0NjE4OCwiZXhwIjoyMDQ3NTIyMTg4fQ.yWR7XYPZF6M4jv9hOVU5SbgAC7fYfs1wIQ4ASktfBFs';

$supabase = CreateClient::create($supabaseUrl, $supabaseKey);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'login':
                handleLogin($supabase);
                break;
            case 'register':
                handleRegister($supabase);
                break;
            case 'recover':
                handleRecover($supabase);
                break;
        }
    }
}

function handleLogin($supabase) {
    $email = $_POST['username'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    // Aquí deberías implementar la lógica de autenticación
    // Por ejemplo, buscar el usuario en la base de datos y verificar la contraseña
    $response = $supabase
        ->from('usuarios')
        ->select('*')
        ->eq('email', $email)
        ->execute();

    if ($response->count() > 0) {
        $user = $response->data[0];
        if (password_verify($password, $user['password']) && $user['rol'] == $role) {
            echo json_encode(['success' => true, 'message' => 'Login exitoso']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
    }
}

function handleRegister($supabase) {
    $name = $_POST['nombre'] . ' ' . $_POST['apellido'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password-registro'], PASSWORD_DEFAULT);
    $role = 'cliente'; // Por defecto, los nuevos usuarios son clientes

    $response = $supabase
        ->from('usuarios')
        ->insert([
            'email' => $email,
            'name' => $name,
            'password' => $password,
            'rol' => $role
        ])
        ->execute();

    if ($response->count() > 0) {
        echo json_encode(['success' => true, 'message' => 'Registro exitoso']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error en el registro']);
    }
}

function handleRecover($supabase) {
    $email = $_POST['email-recuperar'];

    // Aquí deberías implementar la lógica para recuperar la contraseña
    // Por ejemplo, generar un token y enviar un correo electrónico

    echo json_encode(['success' => true, 'message' => 'Se ha enviado un enlace de recuperación a su correo']);
}