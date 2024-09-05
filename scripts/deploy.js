const hre = require("hardhat");

async function main() {
  [owner, addr1, addr2] = await hre.ethers.getSigners();
  Villamonica = await  hre.ethers.getContractFactory('Villamonica');
  villamonica = await Villamonica.connect(owner).deploy(owner.address);
  const receipt = await villamonica.waitForDeployment();
  //console.log(receipt);
  const testo = await villamonica.connect(owner).safeMint(addr1.address, 'ipfs://jdom-uri');
  const testa = await villamonica.connect(owner).safeMint(addr1.address, 'ipfs://uri-uri');
  //console.log(testo);
  const uri = await villamonica.tokenURI(1);
  const tokenId = await villamonica.tokenOfOwnerByIndex(addr1.address, 0);
  const ownerOfToken0 = await villamonica.ownerOf(tokenId);
  console.log("TokenId del propietario:", tokenId.toString());
  console.log(uri);
  console.log(ownerOfToken0);
    // Actualiza el URI del primer token (ahora llamando desde el propietario)
  await villamonica.connect(owner).updateTokenURI(3, 'https://ico2.co/metadataVillamonica/villaModel.php?credit=NUMBER');

    // Obtiene información actualizada del primer token
  const uriAfterUpdate = await villamonica.tokenURI(1);
  console.log("URI después de la actualización:", uriAfterUpdate);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});