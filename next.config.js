const { networkInterfaces } = require("node:os");

// Allow this computer's LAN addresses when previewing on a phone.
// Recompute on startup so switching Wi-Fi networks needs no code change.
const lanAddresses = Object.values(networkInterfaces()).flat()
  .filter((address) => address && !address.internal && address.family === "IPv4")
  .map((address) => address.address);

module.exports = {
  allowedDevOrigins: lanAddresses,
};
