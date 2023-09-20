const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

const createToken = (payload, expiresIn) => {
    if(!expiresIn) expiresIn = process.env.TOKEN_DURATION;
    return jwt.sign(payload, SECRET, { expiresIn });
};

module.exports = createToken;