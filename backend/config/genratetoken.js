const jwt = require("jsonwebtoken");

const generateToken = (id) => {
const JWT_SECRET =
  "8753436e24e838b1263ac6666dea9f6bccdbf9509b62a824ebeba86c3be7c4393ff30d55c3592aa2447801073ba1097fdcbd662fdbc05a3f81fe73688d55335f";

    console.log(JWT_SECRET);
  return jwt.sign({ id },JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
