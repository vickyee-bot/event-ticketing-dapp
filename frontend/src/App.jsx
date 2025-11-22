import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./constants";

function App() {
  const [account, setAccount] = useState("");
  const [tickets, setTickets] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [loading, setLoading] = useState(false);

  // Load tickets from localStorage on component mount
  useEffect(() => {
    const savedTickets = localStorage.getItem("ticketSales");
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
      setTotalTickets(JSON.parse(savedTickets).length);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install Core Wallet!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
      console.log("Connected:", address);
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Failed to connect: " + error.message);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setTickets([]);
    setTotalTickets(0);
    localStorage.removeItem("ticketSales");
  };

  const buyTicket = async () => {
    if (!account) {
      alert("Please connect wallet first!");
      return;
    }

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.buyTicket({
        value: ethers.parseEther("0.1"),
      });

      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction confirmed!", receipt);

      // Track ticket purchase locally
      const newTicket = {
        buyer: account,
        ticketId: totalTickets,
        purchaseTime: Math.floor(Date.now() / 1000),
        txHash: receipt.hash,
      };

      const updatedTickets = [...tickets, newTicket];
      setTickets(updatedTickets);
      setTotalTickets(updatedTickets.length);
      localStorage.setItem("ticketSales", JSON.stringify(updatedTickets));

      alert("🎉 Ticket purchased successfully! Ticket #" + totalTickets);
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (totalTickets / 100) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-gray-800">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center py-6">
            {/* Event Info */}
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Avalanche Summit 2025
              </h1>
              <p className="text-lg text-gray-700 mb-1">
                Exclusive Blockchain Conference
              </p>
              <p className="text-gray-600">
                December 15, 2025 • 9:00 AM - 6:00 PM EST
              </p>
            </div>

            {/* Wallet Connection */}
            {!account ? (
              <button
                onClick={connectWallet}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="flex flex-col items-center lg:items-end space-y-3">
                <div className="text-center lg:text-right">
                  <p className="text-sm text-gray-600 mb-1">Connected Wallet</p>
                  <p className="font-mono font-semibold text-gray-900">
                    {account.slice(0, 6)}...{account.slice(-4)}
                  </p>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="bg-transparent text-red-500 border border-red-500 font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-red-500 hover:text-white"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Ticket Price Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center animate-fade-in border border-white/20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Ticket Price
            </h2>
            <div className="flex items-baseline justify-center space-x-3">
              <span className="text-5xl lg:text-6xl font-bold text-gray-900">
                0.1
              </span>
              <span className="text-2xl lg:text-3xl font-semibold text-gray-600">
                AVAX
              </span>
            </div>
          </div>

          {/* Available Tickets Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 animate-fade-in border border-white/20">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              Available Tickets
            </h2>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Tickets Sold</span>
                <span>{totalTickets} / 100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Buy Ticket Button */}
            <div className="text-center">
              <button
                onClick={buyTicket}
                disabled={loading || !account || totalTickets >= 100}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold text-lg px-12 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Buy Ticket"
                )}
              </button>

              {totalTickets >= 100 && (
                <p className="text-green-600 font-semibold mt-4 text-lg">
                  🎉 All tickets sold out!
                </p>
              )}
            </div>
          </div>

          {/* Recent Purchases */}
          {tickets.length > 0 && (
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-slide-up border border-white/20">
              <details className="cursor-pointer">
                <summary className="text-lg font-semibold text-gray-700 list-none">
                  <div className="flex items-center justify-between">
                    <span>Recent Purchases ({tickets.length})</span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </summary>
                <div className="mt-4 space-y-3">
                  {tickets
                    .slice(-5)
                    .reverse()
                    .map((ticket, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <span className="font-semibold text-gray-800">
                          Ticket #{ticket.ticketId}
                        </span>
                        <span className="font-mono text-sm text-gray-600">
                          {ticket.buyer.slice(0, 6)}...{ticket.buyer.slice(-4)}
                        </span>
                      </div>
                    ))}
                </div>
              </details>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/95 backdrop-blur-sm mt-12 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>Powered by Avalanche • Built for Demo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
