const fetch = require('node-fetch');
const { ethers } = require('hardhat');

// Función para verificar el token y obtener datos del URI
async function main() {
    // Obtener la dirección del contrato y el ID del token desde las variables de entorno
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const tokenId = process.env.TOKEN_ID;

    try {
        if (!contractAddress || !tokenId) {
            console.error('Las variables de entorno CONTRACT_ADDRESS y TOKEN_ID son necesarias.');
            throw new Error('Las variables de entorno CONTRACT_ADDRESS y TOKEN_ID son necesarias.');
        }

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

        console.log('Datos del JSON descargado:', data);
        return data;
    } catch (error) {
        console.error('Error durante la verificación del token o al obtener los datos del URI:', error);
    }
}

// Ejecutar la función principal
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
