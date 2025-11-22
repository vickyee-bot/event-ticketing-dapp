// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TicketSale {
    uint256 public constant TICKET_PRICE = 0.1 ether;
    uint256 public totalTickets;
    uint256 public constant MAX_TICKETS = 1000;
    
    struct Ticket {
        address buyer;
        uint256 ticketId;
        uint256 purchaseTime;
    }
    
    Ticket[] public tickets;
    mapping(address => uint256[]) public userTickets;
    mapping(uint256 => bool) public ticketExists;
    
    event TicketPurchased(address indexed buyer, uint256 ticketId, uint256 timestamp);
    event FundsWithdrawn(address owner, uint256 amount);
    
    error InsufficientPayment();
    error MaxTicketsReached();
    error TransferFailed();
    
    function buyTicket() external payable {
        if (msg.value != TICKET_PRICE) revert InsufficientPayment();
        if (totalTickets >= MAX_TICKETS) revert MaxTicketsReached();
        
        uint256 newTicketId = totalTickets;
        tickets.push(Ticket(msg.sender, newTicketId, block.timestamp));
        userTickets[msg.sender].push(newTicketId);
        ticketExists[newTicketId] = true;
        
        totalTickets++;
        emit TicketPurchased(msg.sender, newTicketId, block.timestamp);
    }
    
    function getTickets() external view returns (Ticket[] memory) {
        return tickets;
    }
    
    function getUserTickets(address _user) external view returns (uint256[] memory) {
        return userTickets[_user];
    }
    
    function getSimpleTicketInfo() external view returns (uint256 _totalSold, uint256 _price, uint256 _remaining) {
        return (totalTickets, TICKET_PRICE, MAX_TICKETS - totalTickets);
    }
    
    function withdraw() external {
        uint256 balance = address(this).balance;
        (bool success, ) = msg.sender.call{value: balance}("");
        if (!success) revert TransferFailed();
        emit FundsWithdrawn(msg.sender, balance);
    }
    
    // Gas-saving: Get specific ticket info without loading all tickets
    function getTicketInfo(uint256 _ticketId) external view returns (address buyer, uint256 purchaseTime) {
        require(_ticketId < totalTickets, "Ticket does not exist");
        Ticket memory ticket = tickets[_ticketId];
        return (ticket.buyer, ticket.purchaseTime);
    }
}