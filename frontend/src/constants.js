export const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

// Minimal ABI that should work
export const CONTRACT_ABI = [
  {
    inputs: [],
    name: "TICKET_PRICE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalTickets",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTickets",
    outputs: [
      {
        components: [
          { internalType: "address", name: "buyer", type: "address" },
          { internalType: "uint256", name: "ticketId", type: "uint256" },
          { internalType: "uint256", name: "purchaseTime", type: "uint256" },
        ],
        internalType: "struct TicketSale.Ticket[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyTicket",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "ticketId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "TicketPurchased",
    type: "event",
  },
];
