from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers.routes import router as certificado_router  # Importa desde el nuevo directorio 'routers'
import os

app = FastAPI()
# Ruta para almacenar las imágenes generadas
RUTA_IMAGENES = "imagenes_generadas"

# Crear el directorio si no existe
if not os.path.exists(RUTA_IMAGENES):
    os.makedirs(RUTA_IMAGENES)

# Incluir las rutas del módulo 'routes'
app.include_router(certificado_router)
