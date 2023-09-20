const createToken = require("@src/utils/create-token");

module.exports = async (req, res) => {
  try {
    const userInfo = req.user;
    const user = await prisma.user.findUnique({
      where: {
        id: userInfo.id,
      },
    });

    if (!user || !user.active)
      throw { status: 401, message: "Usuário ou senha invalido!" };
    let token = await createToken({
      user: user.id,
    });

    user.password = undefined;

    res.json({
      user: user,
      token: token,
    });
  } catch (e) {
    let status = e.status || 500;
    let message = e.message || "Internal Server Error";
    res.status(status).json({ success: false, message: message, error: e });
  }
};
