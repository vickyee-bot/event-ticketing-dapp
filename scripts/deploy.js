async function main() {
  console.log("Deploying TicketSale contract...");

  const TicketSale = await ethers.getContractFactory("TicketSale");
  const ticketSale = await TicketSale.deploy();

  // Wait for deployment to complete - CORRECT METHOD
  await ticketSale.waitForDeployment();

  const address = await ticketSale.getAddress();
  console.log("Contract deployed to:", address);
  console.log("Deployment successful! 🎉");

  // Save address for frontend
  const fs = require("fs");
  fs.writeFileSync("deployed-address.txt", address);
  console.log("Address saved to deployed-address.txt");

  return address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
