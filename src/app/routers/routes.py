from fastapi import APIRouter, Request, HTTPException
from datetime import datetime
from models.models import CertificadoData, CertificadoModel, MintTokenRequest, VerifyTokenRequest, CedulasListResponse
from database.database import certificados_collection, get_next_certificate_number
from utils.utils import generar_imagen_con_texto
import subprocess
import os

router = APIRouter()

# Ruta para almacenar las imágenes generadas
RUTA_IMAGENES = "imagenes_generadas"
URL_BASE = "/imagenes_generadas"

@router.post("/generar_imagen", response_model=CertificadoModel)
def generar_imagen_endpoint(datos: CertificadoData, request: Request):
    # Verificar si la cédula ya tiene un certificado
    certificado_existente = certificados_collection.find_one({"cedula": datos.cedula})
    if certificado_existente:
        raise HTTPException(status_code=400, detail="El certificado para esta cédula ya existe.")

    # Obtener la ruta de la imagen base
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    ruta_imagen_base = os.path.join(BASE_DIR, "static", "images", "certificado-mamus.png")

    if not os.path.exists(ruta_imagen_base):
        raise HTTPException(status_code=500, detail="La imagen base no existe.")

    #Uso en la función generar_imagen_con_texto
    try:
        imagen = generar_imagen_con_texto(ruta_imagen_base, datos.texto, datos.cedula, datos.descripcion)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando la imagen: {str(e)}")
    
    if not os.path.exists(RUTA_IMAGENES):
        os.makedirs(RUTA_IMAGENES)

    # Guardar la imagen en un archivo
    nombre_imagen = f"certificado_{datos.cedula}.png"
    ruta_imagen = os.path.join(RUTA_IMAGENES, nombre_imagen)
    imagen.save(ruta_imagen)
    next_number = get_next_certificate_number()
    # Construir la URL de la imagen
    base_url = str(request.base_url).rstrip("/")
    url_imagen = f"{base_url}{URL_BASE}/{nombre_imagen}"
    
    # Crear los datos del certificado
    data_certificado = {
        "texto": datos.texto,
        "cedula": datos.cedula,
        "descripcion": datos.descripcion,
        "image_url": url_imagen,
        "number_certificate": next_number,
        "name": "Mamus NFT Certificate",
        "developer": "CONEXALAB and JDOM1824",
        "attributes": [
            {
                "trait_type": "To",
                "value": datos.texto,
            },
            {
                "trait_type": "No",
                "value": datos.cedula,
            },
            {
                "display_type": "date",
                "trait_type": "Data Collection Date",
                "value": int(datetime.now().timestamp()),
            }
        ],
        "creation_date": int(datetime.now().timestamp())
    }
    
    # Insertar el certificado en mongomock
    nuevo_certificado_id = certificados_collection.insert_one(data_certificado).inserted_id
    certificado_creado = certificados_collection.find_one({"_id": nuevo_certificado_id})
    
    # Devolver el certificado creado
    if certificado_creado:
        return certificado_creado
    else:
        raise HTTPException(status_code=400, detail="Error al crear el certificado")

