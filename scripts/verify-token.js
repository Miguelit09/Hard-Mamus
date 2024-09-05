const hre = require("hardhat");

async function main() {
  // Conectar con el contrato desplegado
  const Mamus = await hre.ethers.getContractFactory("Mamus");
  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // Usa la dirección del contrato desplegado
  const mamus = await Mamus.attach(contractAddress);

  // Verificar el tokenURI y tokenId del primer token minteado
  const tokenId = 0;  // Asumiendo que el primer token minteado tiene ID 0
  const uri = await mamus.tokenURI(tokenId);
  const owner = await mamus.ownerOf(tokenId);

  console.log(`Token ID: ${tokenId}`);
  console.log(`Token URI: ${uri}`);
  console.log(`Propietario del Token ID ${tokenId}: ${owner}`);
}

// Manejo de errores
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
