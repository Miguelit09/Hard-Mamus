# Hard-Mamus Project

This project demonstrates the use of Hardhat for Ethereum smart contract development. It includes sample contracts, deployment scripts, and test configurations.

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

## Usage

Try running some of the following Hardhat tasks:

- **Display Hardhat Help:**
    ```bash
    npx hardhat help
    ```

- **Run Tests:**
    ```bash
    npx hardhat test
    ```

- **Report Gas Usage:**
    ```bash
    REPORT_GAS=true npx hardhat test
    ```

- **Start Hardhat Node:**
    ```bash
    npx hardhat node
    ```

- **Deploy Contracts:**
    ```bash
    npx hardhat run scripts/deploy.js
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
