const hre = require("hardhat");

async function main() {
    // Obtener la dirección del contrato y el ID del token desde las variables de entorno
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const tokenId = process.env.TOKEN_ID;

    if (!contractAddress || !tokenId) {
        console.error('Las variables de entorno CONTRACT_ADDRESS y TOKEN_ID deben estar definidas');
        process.exit(1);
    }

    // Obtener la fábrica del contrato
    const Mamus = await hre.ethers.getContractFactory("Mamus");

    // Conectar con el contrato desplegado
    const mamus = Mamus.attach(contractAddress);

    // Verificar el tokenURI y el propietario del token
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
