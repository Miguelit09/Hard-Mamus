import mongomock

# Configurar la conexión a mongomock
client = mongomock.MongoClient()
database = client.certificados_db  # Nombre de tu base de datos
certificados_collection = database.certificados  # Colección para los certificados
