import hre from hardhat 

async function main() {
  // Obtén las cuentas
  const [owner] = await hre.ethers.getSigners();

  // Despliega el contrato "Mamus"
  const Mamus = await hre.ethers.getContractFactory("Mamus");
  const mamus = await Mamus.deploy(owner.address);

  // Espera a que el contrato sea desplegado
  //await mamus.deployTransaction.wait();

  console.log("Mamus deployed to:", await mamus.getAddress());

  // Mintea un nuevo token con un URI de juguete
  const toyURI = "ipfs://toy-uri";
  await mamus.safeMint(owner.address, toyURI);

  // Verifica el URI del token minteado
  const uri = await mamus.tokenURI(0);
  const totalSupply = await mamus.totalSupply();
  console.log("TokenURI of the minted toy token:", uri);
  console.log("Total Supply of tokens:", totalSupply.toString());
}

// Manejo de errores
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
