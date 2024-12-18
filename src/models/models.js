const { z } = require('zod');
const { ObjectId } = require('mongodb');

// Clase para manejar ObjectId de MongoDB
const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);
const objectIdValidator = (v) => {
  if (!ObjectId.isValid(v)) {
    throw new Error('ID no válido');
  }
  return new ObjectId(v);
};

// Modelo de datos para insertar en MongoDB
const CertificadoModel = z.object({
  _id: objectIdSchema,
  texto: z.string(),
  cedula: z.string(),
  descripcion: z.string(),
  image_url: z.string(),
  number_certificate: z.number(),
  name: z.string().default('Mamus NFT Certificate'),
  developer: z.string().default('CONEXALAB and JDOM1824'),
  attributes: z.array(z.object({})),
  creation_date: z.number(),
});

const MintTokenRequest = z.object({
  contract_address: z.string(),
  token_uri: z.string(),
});

const CertificadoData = z.object({
  texto: z.string(),
  cedula: z.string(),
  descripcion: z.string(),
});

const VerifyTokenRequest = z.object({
  contract_address: z.string(),
  token_id: z.number(),
});

const CedulasListResponse = z.object({
  cedulas: z.array(z.string()),
});

module.exports = {
  CertificadoModel,
  MintTokenRequest,
  CertificadoData,
  VerifyTokenRequest,
  CedulasListResponse,
};