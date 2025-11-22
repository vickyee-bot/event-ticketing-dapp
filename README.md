# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
# 🎫 Avalanche Event Ticketing dApp

A decentralized event ticketing application built on the Avalanche blockchain that allows users to purchase event tickets using AVAX. Each ticket purchase is recorded on-chain, providing transparent ownership and transaction history.

![Avalanche dApp](https://img.shields.io/badge/Avalanche-dApp-red) ![React](https://img.shields.io/badge/React-18.2-blue) ![Solidity](https://img.shields.io/badge/Solidity-0.8.18-green) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

## 🌟 Features

- **Wallet Integration**: Connect with Core Wallet or MetaMask
- **Blockchain Tickets**: Purchase tickets with AVAX on Avalanche Fuji testnet
- **Real-time Updates**: Live ticket counter and purchase history
- **Transparent Ownership**: Every ticket recorded on-chain
- **Professional UI**: Modern glass morphism design with Tailwind CSS
- **Mobile Responsive**: Works seamlessly on all devices

## 🏗️ Architecture

```
Frontend (Vercel) ↔ Avalanche Fuji Testnet ↔ Smart Contract
```

- **Frontend**: React + Vite + Tailwind CSS
- **Blockchain**: Avalanche Fuji Testnet (C-Chain)
- **Smart Contract**: Solidity with Hardhat
- **Deployment**: Vercel (Frontend) + Fuji Testnet (Contract)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- Core Wallet or MetaMask
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/avalanche-ticketing-dapp.git
cd avalanche-ticketing-dapp
```

2. **Install dependencies**
```bash
# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. **Set up environment variables**
```bash
# In project root, create .env
PRIVATE_KEY=your_wallet_private_key

# In frontend, create .env
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
```

4. **Deploy contract locally**
```bash
# Start local Hardhat network
npx hardhat node

# In another terminal, deploy contract
npx hardhat run scripts/deploy.js --network localhost
```

5. **Run frontend**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to view the dApp.

## 📦 Deployment

### Smart Contract to Fuji Testnet

1. **Get test AVAX** from [Avalanche Faucet](https://faucet.avax.network/)
2. **Deploy contract**:
```bash
npx hardhat run scripts/deploy.js --network fuji
```
3. **Save the contract address** for frontend configuration

### Frontend to Vercel

1. **Push code to GitHub**
2. **Connect repository to Vercel**
3. **Set environment variables** in Vercel dashboard:
   - `VITE_CONTRACT_ADDRESS`: Your deployed contract address
4. **Deploy** - Vercel will automatically build and deploy

## 🎯 Usage

### For Users

1. **Connect Wallet**: Click "Connect Wallet" and approve connection
2. **Switch Network**: Ensure you're on Avalanche Fuji Testnet
3. **Get Test AVAX**: Use the faucet if needed
4. **Buy Tickets**: Click "Buy Ticket" and confirm transaction
5. **View History**: See your tickets in the recent purchases section

### For Developers

The dApp demonstrates:
- Wallet connection and network switching
- Smart contract interaction with ethers.js
- Transaction sending and confirmation
- Real-time data reading from blockchain
- Professional dApp UI/UX patterns

## 🔧 Technical Details

### Smart Contract

**Location**: `contracts/TicketSale.sol`

Key functions:
- `buyTicket()`: Purchase a ticket with 0.1 AVAX
- `getTickets()`: Retrieve all ticket purchases
- `totalTickets()`: Get current ticket count
- `TICKET_PRICE()`: Get ticket price in AVAX

### Frontend Architecture

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with glass morphism effects
- **Blockchain**: ethers.js v6 for wallet and contract interaction
- **State Management**: React hooks (useState, useEffect)
- **Network**: Avalanche Fuji Testnet (Chain ID: 43113)

### File Structure

```
avalanche-ticketing-dapp/
├── contracts/
│   └── TicketSale.sol          # Smart contract
├── scripts/
│   └── deploy.js               # Deployment script
├── frontend/
│   ├── src/
│   │   ├── App.jsx             # Main component
│   │   ├── constants.js        # Contract ABI and addresses
│   │   └── main.jsx            # App entry point
│   ├── index.html
│   ├── tailwind.config.js      # Tailwind configuration
│   └── vite.config.js          # Vite configuration
├── hardhat.config.js           # Hardhat configuration
└── package.json
```

## 🔗 Blockchain Information

- **Network**: Avalanche Fuji Testnet
- **Chain ID**: 43113 (0xA869)
- **RPC URL**: https://api.avax-test.network/ext/bc/C/rpc
- **Block Explorer**: https://testnet.snowtrace.io/
- **Currency**: AVAX (Testnet)

## 🛠️ Development

### Adding New Features

1. **Smart Contract Updates**:
   - Modify `TicketSale.sol`
   - Compile: `npx hardhat compile`
   - Deploy: `npx hardhat run scripts/deploy.js --network fuji`

2. **Frontend Updates**:
   - Update React components in `frontend/src/`
   - Test locally: `npm run dev`
   - Deploy: Push to GitHub (Vercel auto-deploys)

### Testing

```bash
# Run Hardhat tests
npx hardhat test

# Test on local network
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Avalanche](https://www.avax.network/) for the blockchain infrastructure
- [Hardhat](https://hardhat.org/) for smart contract development tools
- [Vercel](https://vercel.com/) for seamless frontend deployment
- [Tailwind CSS](https://tailwindcss.com/) for the amazing styling framework

## 📞 Support

If you have any questions or need help with setup:

1. Check the [Avalanche documentation](https://docs.avax.network/)
2. Open an [issue](https://github.com/YOUR_USERNAME/avalanche-ticketing-dapp/issues)
3. Contact the development team

## 🚀 Live Demo

Check out the live application: [Your Vercel URL]

---

**Built with ❤️ for the Avalanche ecosystem**
