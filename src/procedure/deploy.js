const hre = require("hardhat");

async function main() {
  // Obtén las cuentas
  const [owner] = await hre.ethers.getSigners();

  // Despliega el contrato "Mamus"
  const Mamus = await hre.ethers.getContractFactory("Mamus");
  const mamus = await Mamus.deploy(owner.address);

  // Espera a que el contrato sea desplegado
  //await mamus.deployTransaction.wait();

  console.log("Mamus deployed to:", await mamus.getAddress());
}

// Manejo de errores
module.exports = main;
