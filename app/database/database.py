import mongomock
from pymongo import MongoClient

# Configurar la conexión a mongomock
client = mongomock.MongoClient()
database = client.certificados_db  # Nombre de tu base de datos

# Crear o acceder a la colección de certificados
certificados_collection = database.certificados

# Crear o acceder a la colección de contadores
counters_collection = database.counters

def get_next_certificate_number():
    # Definir el documento de contador para certificados
    counter = counters_collection.find_one_and_update(
        {'_id': 'certificates'},
        {'$inc': {'sequence_value': 1}},
        upsert=True,
        return_document=True
    )
    return counter['sequence_value']
