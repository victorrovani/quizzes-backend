const { default: axios } = require("axios");

const { RECAPTCHA_URL, RECAPTCHA_SECRET } = process.env;

module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const token = req.body?.recaptcha || req.headers?.recaptcha;

  if (!token)
    return res.status(401).send({
      message: "Recaptcha token não informado",
    });

  axios({
    method: "post",
    url: RECAPTCHA_URL,
    data: `secret=${RECAPTCHA_SECRET}&response=${token}`,
  }).then((response) => {
    if (response.data.success) {
      next();
    } else {
      res.status(401).send({
        message: "Falha recaptcha",
      });
    }
  });
};
