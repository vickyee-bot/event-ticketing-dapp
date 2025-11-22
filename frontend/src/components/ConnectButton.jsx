import { useState } from "react";

export default function ConnectButton({ onConnect, account }) {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (!window.ethereum) {
        alert("Please install Core Wallet!");
        return;
      }

      // Just pass window.ethereum to parent, let parent handle provider creation
      await onConnect(window.ethereum);
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Failed to connect: " + error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="connect-section">
      {!account ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="connect-btn"
        >
          {isConnecting ? "Connecting..." : "Connect Core Wallet"}
        </button>
      ) : (
        <div className="connected">
          ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      )}
    </div>
  );
}
