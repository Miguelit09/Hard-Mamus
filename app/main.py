from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routers.routes import router as certificado_router  # Importa desde el nuevo directorio 'routers'
import os

app = FastAPI()
# Ruta para almacenar las imágenes generadas
RUTA_IMAGENES = "imagenes_generadas"

# Crear el directorio si no existe
if not os.path.exists(RUTA_IMAGENES):
    os.makedirs(RUTA_IMAGENES)

# Montar la carpeta de imágenes para servir archivos estáticos
app.mount("/imagenes_generadas", StaticFiles(directory=RUTA_IMAGENES), name="imagenes_generadas")
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Incluir las rutas del módulo 'routes'
app.include_router(certificado_router)
