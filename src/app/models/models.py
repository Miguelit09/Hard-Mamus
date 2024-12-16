from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List

# Clase para manejar ObjectId de MongoDB
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("ID no válido")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")

# Modelo de datos para insertar en MongoDB
class CertificadoModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    texto: str
    cedula: str
    descripcion: str
    image_url: str
    number_certificate: int
    name: str = "Mamus NFT Certificate"
    developer: str = "CONEXALAB and JDOM1824"
    attributes: List[dict]
    creation_date: int

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class MintTokenRequest(BaseModel):
    contract_address: str
    token_uri: str

class CertificadoData(BaseModel):
    texto: str
    cedula: str
    descripcion: str

class VerifyTokenRequest(BaseModel):
    contract_address: str
    token_id: int

class CedulasListResponse(BaseModel):
    cedulas: List[str]

