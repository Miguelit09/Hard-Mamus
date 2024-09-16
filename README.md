# Hard-Mamus Project

## Getting Started

Follow these steps to set up and run the project:

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/jdom1824/Hard-Mamus.git
    cd Hard-Mamus
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Set up Python virtual environment and install dependencies**
  ```bash
  python3 -m venv env
  source env/bin/activate 
  ```

## Scripts

To interact with the project, you can use the following npm scripts:

- **Start Hardhat Node:**  
    ```bash
    npm run start-node
    ```

- **Deploy Contract:**
    ```bash
    npm run deploy
    ```

- **Verify Token:**
    ```bash
    npm run verify
    ```

- **Uvicorn**
    ```bash
     npm run start:uvicorn
    ```

4. **Example request to generate a certificate:**
    ```bash
    curl -X POST "http://127.0.0.1:8000/generar_imagen" \
    -H "Content-Type: application/json" \
    -d '{
      "texto": "David Melo",
      "cedula": "1093754037",
      "descripcion": "For successfully completing the advanced programming course in Python and professional ethical hacking."
    }'
    ```
5. **Mint-Token:**
    ```bash
      curl -X POST "http://127.0.0.1:8000/mint-token" \
      -H "Content-Type: application/json" \
      -d '{"contract_address": "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9", "token_uri": "http://127.0.0.1:8000/certificado/1093754037"}'
    ```

## Configuration

### Hardhat Configuration

Ensure your `hardhat.config.js` is configured correctly for your local and other networks. Example configuration:

```js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
  },
};
