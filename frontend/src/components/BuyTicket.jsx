import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";

export default function BuyTicket({ signer, onTicketPurchased }) {
  const [isBuying, setIsBuying] = useState(false);

  const buyTicket = async () => {
    if (!signer) {
      alert("Please connect wallet first!");
      return;
    }

    setIsBuying(true);
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );
      const tx = await contract.buyTicket({
        value: ethers.utils.parseEther("0.1"),
      });

      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed!");

      alert("🎉 Ticket purchased successfully!");
      onTicketPurchased();
    } catch (error) {
      console.error("Purchase failed:", error);
      if (error.message.includes("user rejected")) {
        alert("Transaction was rejected");
      } else if (error.message.includes("insufficient funds")) {
        alert("Insufficient AVAX for ticket purchase");
      } else {
        alert("Purchase failed: " + error.message);
      }
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="buy-ticket">
      <h3>Buy Event Ticket</h3>
      <p>Price: 0.1 AVAX</p>
      <button
        onClick={buyTicket}
        disabled={isBuying || !signer}
        className="buy-btn"
      >
        {isBuying ? "Purchasing..." : "Buy Ticket (0.1 AVAX)"}
      </button>
    </div>
  );
}
