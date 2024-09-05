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

- **Mint Token:**
    ```bash
    npm run mint
    ```

- **Verify Token:**
    ```bash
    npm run verify
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
