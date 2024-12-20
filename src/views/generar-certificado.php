<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $texto = $_POST['texto'];
    $cedula = $_POST['cedula'];
    $descripcion = $_POST['descripcion'];

    $endpoint = "http://procedures/generate-image";
    $data = array(
        "text" => $texto,
        "id" => $cedula,
        "description" => $descripcion
    );

    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/x-www-form-urlencoded'));
    $response = curl_exec($ch);
    if (curl_errno($ch)) {
        $error = curl_error($ch);
        echo "Error: " . $error;
    }
    curl_close($ch);
    if ($response !== FALSE) {
        $result = json_decode($response, true);
        $message = $result['message'];
    } else {
        $error = "Error al generar la imagen.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generar Imagen</title>
</head>

<body>
    <h1>Generar Imagen</h1>
    <form id="generate-image-form" action="" method="post">
        <label for="texto">Texto:</label>
        <input type="text" id="texto" name="texto" required><br><br>
        <label for="cedula">Cédula:</label>
        <input type="text" id="cedula" name="cedula" required><br><br>
        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea><br><br>
        <input type="submit" value="Generar Imagen">
    </form>

    <div id="result-container">
        <?php if (isset($message)): ?>
            <h2>Resultado</h2>
            <p><?php echo htmlspecialchars($message); ?></p>
        <?php elseif (isset($error)): ?>
            <p style="color: red;"><?php echo htmlspecialchars($error); ?></p>
        <?php endif; ?>
    </div>
</body>

</html>