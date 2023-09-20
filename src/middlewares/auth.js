const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({
      error: "Nenhum token informado",
    });

  const parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).send({
      error: "Erro no token",
    });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({
      error: "Token mal formatado",
    });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token expirado" });
    req.franchise = decoded.franchise;
    req.user = {
      id: decoded.user,
      permission: decoded.permission,
    };
    req.jwt = decoded;

    return next();
  });
};
