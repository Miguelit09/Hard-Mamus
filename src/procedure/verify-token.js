const fetch = require("node-fetch");
const { ethers } = require("hardhat");

// Función para verificar el token y obtener datos del URI
async function main(contractAddress, tokenId) {
  const Mamus = await ethers.getContractFactory("Mamus");
  const mamus = Mamus.attach(contractAddress);

  const uri = await mamus.tokenURI(tokenId);
  const owner = await mamus.ownerOf(tokenId);

  console.log(`Token ID: ${tokenId}`);
  console.log(`Token URI: ${uri}`);
  console.log(`Propietario del Token ID ${tokenId}: ${owner}`);

  const response = await fetch(uri);

  if (!response.ok) {
    throw new Error(`Error en la solicitud HTTP: ${response.status}`);
  }

  const data = await response.json();

  console.log("Datos del JSON descargado:", data);
  return data;
}

module.exports = main;
