import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";

export default function TicketList({ provider }) {
  const [tickets, setTickets] = useState([]);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTickets = async () => {
    if (!provider) return;

    setLoading(true);
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      // Load simple info
      const [totalSold, price, remaining] =
        await contract.getSimpleTicketInfo();
      setTicketInfo({
        totalSold: totalSold.toString(),
        price: ethers.utils.formatEther(price),
        remaining: remaining.toString(),
      });

      // Load all tickets
      const allTickets = await contract.getTickets();
      setTickets(allTickets);
    } catch (error) {
      console.error("Error loading tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [provider]);

  return (
    <div className="ticket-list">
      <div className="ticket-header">
        <h3>Ticket Sales</h3>
        <button onClick={loadTickets} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {ticketInfo && (
        <div className="ticket-stats">
          <p>
            🎫 Sold: {ticketInfo.totalSold} | 💰 Price: {ticketInfo.price} AVAX
            | 📦 Remaining: {ticketInfo.remaining}
          </p>
        </div>
      )}

      <div className="tickets">
        {tickets.length === 0 ? (
          <p>No tickets sold yet</p>
        ) : (
          tickets.map((ticket, index) => (
            <div key={index} className="ticket-item">
              <span>Ticket #{ticket.ticketId.toString()}</span>
              <span>
                Owner: {ticket.buyer.slice(0, 6)}...{ticket.buyer.slice(-4)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
