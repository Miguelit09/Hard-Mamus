from PIL import Image, ImageDraw, ImageFont
from datetime import datetime

def dividir_texto_en_lineas(texto, max_caracteres_por_linea):
    palabras = texto.split(' ')
    lineas = []
    linea_actual = ''
    
    for palabra in palabras:
        if len(linea_actual) + len(palabra) <= max_caracteres_por_linea:
            linea_actual += palabra + ' '
        else:
            lineas.append(linea_actual.strip())
            linea_actual = palabra + ' '
    
    if linea_actual.strip() != '':
        lineas.append(linea_actual.strip())
    
    return lineas

def generar_imagen_con_texto(texto, cedula, descripcion):
    # Crear una imagen en modo 'RGB'
    ancho, alto = 842, 594
    imagen = Image.new('RGB', (ancho, alto), color=(200, 200, 200))  # Fondo gris claro

    draw = ImageDraw.Draw(imagen)

    # Configurar las fuentes (asegúrate de tener las fuentes o usar las predeterminadas)
    try:
        fuente_principal = ImageFont.truetype('arial.ttf', size=40)
    except IOError:
        fuente_principal = ImageFont.load_default()
    
    try:
        fuente_fecha = ImageFont.truetype('arial.ttf', size=20)
    except IOError:
        fuente_fecha = ImageFont.load_default()
    
    try:
        fuente_cedula = ImageFont.truetype('arial.ttf', size=10)
    except IOError:
        fuente_cedula = ImageFont.load_default()
    
    try:
        fuente_descripcion = ImageFont.truetype('arial.ttf', size=18)
    except IOError:
        fuente_descripcion = ImageFont.load_default()

    # Calcular la posición del texto
    if isinstance(fuente_principal, ImageFont.FreeTypeFont):
        bbox_texto = draw.textbbox((0, 0), texto, font=fuente_principal)
    else:
        ancho_texto = len(texto) * 10  # Aproximación: 10px por carácter
        alto_texto = 20  # Aproximación: altura de línea
        bbox_texto = (0, 0, ancho_texto, alto_texto)

    ancho_texto = bbox_texto[2] - bbox_texto[0]
    alto_texto = bbox_texto[3] - bbox_texto[1]
    x_texto = (ancho - ancho_texto) / 2
    y_texto = (alto - alto_texto) / 2

    # Dibujar solo el texto principal
    draw.text((x_texto, y_texto), texto, font=fuente_principal, fill='black')

    # Agregar la fecha actual
    opciones_fecha = "%B %d, %Y"
    fecha_actual = datetime.now().strftime(opciones_fecha)

    etiqueta_fecha = "DATE OF COMPLETION"
    x_etiqueta_fecha = 40
    y_etiqueta_fecha = alto - 60  # Ajusta según tus necesidades
    x_fecha = 40
    y_fecha = alto - 40  # Ajusta según tus necesidades

    draw.text((x_etiqueta_fecha, y_etiqueta_fecha), etiqueta_fecha, font=fuente_fecha, fill='black')
    draw.text((x_fecha, y_fecha), fecha_actual, font=fuente_fecha, fill='black')

    # Agregar la cédula
    cedula_texto = f"No. {cedula}"
    x_cedula = x_texto
    y_cedula = y_texto + alto_texto + 10  # Ajusta según tus necesidades
    draw.text((x_cedula, y_cedula), cedula_texto, font=fuente_cedula, fill='black')

    # Configuración del texto de la descripción
    max_caracteres_por_linea = 60
    lineas_descripcion = dividir_texto_en_lineas(descripcion, max_caracteres_por_linea)

    # Calcular la altura total ocupada por el texto de la descripción
    bbox_letra = draw.textbbox((0, 0), 'A', font=fuente_descripcion)
    line_height = bbox_letra[3] - bbox_letra[1] + 5  # Altura de línea más espaciado
    total_height = len(lineas_descripcion) * line_height

    # Ajustar la posición y para centrar el bloque de texto completo
    y_descripcion = alto / 2 + 80 - total_height / 2

    for indice, linea in enumerate(lineas_descripcion):
        bbox_linea = draw.textbbox((0, 0), linea, font=fuente_descripcion)
        ancho_linea = bbox_linea[2] - bbox_linea[0]
        y_linea = y_descripcion + (indice * line_height)
        x_centrado = (ancho - ancho_linea) / 2
        draw.text((x_centrado, y_linea), linea, font=fuente_descripcion, fill='black')

    return imagen
