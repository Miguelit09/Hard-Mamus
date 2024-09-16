const hre = require("hardhat");

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const tokenURI = process.env.TOKEN_URI;

    if (!contractAddress || !tokenURI) {
        console.error("Missing required environment variables: CONTRACT_ADDRESS and TOKEN_URI");
        process.exit(1);
    }

    const Mamus = await hre.ethers.getContractFactory("Mamus");
    const mamus = Mamus.attach(contractAddress);
    const [owner] = await hre.ethers.getSigners();
    const tx = await mamus.safeMint(owner.address, tokenURI);
    await tx.wait();

    const uri = await mamus.tokenURI(0);
    const totalSupply = await mamus.totalSupply();
    
    console.log("TokenURI of the minted token:", uri);
    console.log("Total Supply of tokens:", totalSupply.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
