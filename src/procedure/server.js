const express = require("express");

const mint = require("./mint-token");
const deploy = require("./deploy");
const verify = require("./verify-token");

const app = express();
const port = 42069;

app.post("/deploy", async (req, res) => {
  await deploy();
});

app.post("/mint", async (req, res) => {
  const { ctrAddr, tokenUrl } = req.body;
  // TODO: validate input
  await mint(ctrAddr, tokenUrl);
});

app.post("/verify", async (req, res) => {
  const { ctrAddr, tokenId } = req.body;
  // TODO: validate input
  await verify(ctrAddr, tokenId);
});

app.listen(port, () => {
  console.log(`Running contracts server on port ${port}`);
});
