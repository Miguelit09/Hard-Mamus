from fastapi import APIRouter, Request, HTTPException
from datetime import datetime
from ..models.models import CertificadoData, CertificadoModel, MintTokenRequest
from ..database.database import certificados_collection
from ..utils.utils import generar_imagen_con_texto
import subprocess
import os

router = APIRouter()

# Ruta para almacenar las imágenes generadas
RUTA_IMAGENES = "imagenes_generadas"

@router.post("/generar_imagen", response_model=CertificadoModel)
def generar_imagen_endpoint(datos: CertificadoData, request: Request):
    # Generar la imagen con el texto
    imagen = generar_imagen_con_texto(datos.texto, datos.cedula, datos.descripcion)
    
    # Guardar la imagen en un archivo
    nombre_imagen = f"certificado_{datos.cedula}.png"
    ruta_imagen = os.path.join(RUTA_IMAGENES, nombre_imagen)
    imagen.save(ruta_imagen)
    
    # Construir la URL de la imagen
    base_url = str(request.base_url).rstrip("/")
    url_imagen = f"{base_url}/imagenes/{nombre_imagen}"
    
    # Crear los datos del certificado
    data_certificado = {
        "texto": datos.texto,
        "cedula": datos.cedula,
        "descripcion": datos.descripcion,
        "image_url": url_imagen,
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

@router.get("/certificado/{cedula}", response_model=CertificadoModel)
def obtener_certificado(cedula: str):
    certificado = certificados_collection.find_one({"cedula": cedula})
    if certificado:
        return certificado
    else:
        raise HTTPException(status_code=404, detail="Certificado no encontrado")

@router.post("/mint-token")
async def mint_token(request: MintTokenRequest):
    try:
        # Extraer los datos del cuerpo de la solicitud
        contract_address = request.contract_address
        token_uri = request.token_uri

        # Configurar las variables de entorno
        os.environ['CONTRACT_ADDRESS'] = contract_address
        os.environ['TOKEN_URI'] = token_uri

        # Llamar al script de Hardhat con las variables de entorno configuradas
        result = subprocess.run(
            [
                "npm", "run", "mint"
            ],
            capture_output=True, text=True
        )

        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=f"Error during minting: {result.stderr}")

        return {"message": "Token minted successfully", "output": result.stdout}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
