<?php
// Mail Avanti
header("Access-Control-Allow-Origin: *");

$postData = file_get_contents("php://input");
$array = json_decode($postData);

$email = $array->email;
$nombre = $array->name;
$mensaje = "Email: " . $array->email . "\n" . "Name: " . $array->name . "\n" . "Message: " . $array->msg;
$to = "info@avantilibros.com";

$headers  = "From: " . $email . "\r\n";

if (mail($to, "Contacto de: " . $nombre, $mensaje, $headers)) {
  echo "SUCCESS";
} else {
  echo "ERROR";
}

?>
