<?php
// Mail Avanti
header("Access-Control-Allow-Origin: *");

$postData = file_get_contents("php://input");
$array = json_decode($postData);

// Params common to all emails
$subject = $array->subject;
$email = $array->email;
$nombre = $array->name;
$to = "info@avantilibros.com";
// $to = "tomasg88@gmail.com";

// Params specific to each case (download or contact)
$mensaje = "";
$pais = "";
$ciudad = "";
$archivo = "";

// To be formatted below
$asunto = "";

switch($subject) {
    case "contact":
    $msg = $array->msg;
    $mensaje = "Email: " . $email . "\n" . "Name: " . $nombre . "\n" . "Message: " . $msg;
    $asunto = "Nuevo contacto: " . $nombre;
    break;
    case "download":
    $pais = $array->country;
    $ciudad = $array->city;
    $archivo = $array->resource;
    $nombre = $array->name . ' ' . $array->surname;
    $asunto = "Descarga: " . $nombre;
    $mensaje = "Email: " . $email . "\n" . "Name: " . $nombre . "\n" . "País: " . $pais . "\n" . "Ciudad: " . $ciudad;
    break;
    default:
    echo "No mail";
}

$headers  = "From: " . $email . "\r\n";

if (mail($to, $asunto, $mensaje, $headers)) {
  echo "SUCCESS";
} else {
  echo "ERROR";
}

?>
