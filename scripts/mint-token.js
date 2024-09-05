const hre = require("hardhat");
const readline = require("readline");

// Crear una interfaz de readline para la entrada de la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    // Obtener la dirección del contrato desde la consola
    const getContractAddress = () => {
        return new Promise((resolve) => {
            rl.question('Ingrese la dirección del contrato desplegado: ', (address) => {
                resolve(address);
            });
        });
    };

    const contractAddress = await getContractAddress();
    rl.close();

    // Obtener la fábrica del contrato
    const Mamus = await hre.ethers.getContractFactory("Mamus");

    // Conectar con el contrato desplegado
    const mamus = Mamus.attach(contractAddress);

    // Obtener la cuenta del propietario
    const [owner] = await hre.ethers.getSigners();

    // Mintear un nuevo token con un URI de juguete
    const toyURI = "ipfs://toy-uri";
    const tx = await mamus.safeMint(owner.address, toyURI);
    await tx.wait();

    // Verificar el URI del token minteado y el suministro total
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
