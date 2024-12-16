<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Datos enviados desde el formulario
    $texto = $_POST['texto'];
    $cedula = $_POST['cedula'];
    $descripcion = $_POST['descripcion'];

    // Configuración para la solicitud cURL
    $endpoint = "http://uvicorn:8000/generar_imagen";
    $data = json_encode([
        "texto" => $texto,
        "cedula" => $cedula,
        "descripcion" => $descripcion
    ]);

    // Realizar la solicitud POST al endpoint de FastAPI, entre aplicaciones del servidor (se usa uvicorn como host)
    $ch = curl_init($endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && $response) {
        $result = json_decode($response, true);
        $image_url = $result['image_url']; // Asegúrate de que el endpoint devuelve la URL de la imagen generada.
    } else {
        $error = "Error al generar la imagen. Código HTTP: $httpCode.";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generar Imagen</title>
    <script src="../static/scripts/generar-certificado.js" defer>

        // Se comunica con python desde el cliente
        /* fetch("http://localhost:3000/api/generar_imagen") */
    </script>
</head>
<body>
    <h1>Generar Imagen</h1>
    
    <form method="POST">
        <label for="texto">Texto:</label>
        <input type="text" id="texto" name="texto" required><br><br>

        <label for="cedula">Cédula:</label>
        <input type="text" id="cedula" name="cedula" required><br><br>

        <label for="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" required></textarea><br><br>

        <a href="#" class="generate-image">Generar Imagen</a>
    </form>

    <?php if (isset($image_url)): ?>
        <h2>Vista Previa de la Imagen</h2>
        <img src="<?php echo htmlspecialchars($image_url); ?>" alt="Imagen Generada">
    <?php elseif (isset($error)): ?>
        <p style="color: red;"><?php echo htmlspecialchars($error); ?></p>
    <?php endif; ?>
</body>
</html>
