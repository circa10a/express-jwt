const fs = require('fs');

const privateKey = fs.readFileSync('./jwtRS256.key');
const publicKey = fs.readFileSync('./jwtRS256.key.pub');

module.exports = {
  privateKey,
  publicKey,
};
