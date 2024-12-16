const hre = require("hardhat");

async function main(contractAddress, tokenURI) {
  const Mamus = await hre.ethers.getContractFactory("Mamus");
  const mamus = Mamus.attach(contractAddress);
  const [owner] = await hre.ethers.getSigners();
  const tx = await mamus.safeMint(owner.address, tokenURI);
  await tx.wait();

  const totalSupply = await mamus.totalSupply();
  const uri = await mamus.tokenURI(totalSupply);
  console.log("TokenURI of the minted token:", uri);
  console.log("Total Supply of tokens:", totalSupply.toString());
}

module.exports = main;
