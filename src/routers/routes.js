const express = require("express");
const router = express.Router();
const Database = require("./database");
const { generateImageWithText } = require("./utils");
const Certificate = require("./models/Certificate");
const db = new Database();

db.connect().then(() => {
  // Obtener un certificado por cédula
  router.get("/certificate/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const certificate = await Certificate.findOne({ id });
      if (!certificate) {
        res.status(404).send({ message: "Certificate not found" });
      } else {
        res.send(certificate);
      }
    } catch (err) {
      res.status(500).send({ message: "Database error" });
    }
  });

  router.post("/generate-image", async (req, res) => {
    const { text, id, description } = req.body;
    const imageBasePath = "../public/images/certificado-mamus.png";

    try {
      const generatedImagePath = await generateImageWithText(
        imageBasePath,
        text
      );
      const certificate = await Certificate.create({
        text,
        id,
        description,
        imageUrl: generatedImagePath,
      });
      res.send({
        message: "Imagen generada y certificado guardado con éxito",
      });
    } catch (err) {
      res.status(500).send({ message: "Error al generar la imagen" });
    }
  });

  // Mintear un token
  router.post("/mint-token", (req, res) => {
    const { contractAddress, tokenUri } = req.body;
    const npmCmd = `npm run mint`;

    process.env.CONTRACT_ADDRESS = contractAddress;
    process.env.TOKEN_URI = tokenUri;

    require("child_process").exec(npmCmd, (err, stdout, stderr) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Error during minting", error: stderr });
      } else {
        res.send({ message: "Token minted successfully", output: stdout });
      }
    });
  });

  // Verificar un token
  router.post("/verify-token", (req, res) => {
    const { contractAddress, tokenId } = req.body;
    const npmCmd = `npm run verify`;

    process.env.CONTRACT_ADDRESS = contractAddress;
    process.env.TOKEN_ID = tokenId.toString();

    require("child_process").exec(npmCmd, (err, stdout, stderr) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Error during verification", error: stderr });
      } else {
        res.send({
          message: "Token verification completed successfully",
          output: stdout,
        });
      }
    });
  });

  // Obtener todas las cédulas de los certificados
  router.get("/all-certificates", async (req, res) => {
    try {
      const ids = await Certificate.find({}, { _id: 0, id: 1 });
      res.send({ ids });
    } catch (err) {
      res.status(500).send({ message: "Database error" });
    }
  });

  const app = express();
  app.use("/", router);
});
