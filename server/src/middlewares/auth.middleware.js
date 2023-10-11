module.exports.checkIsEmpty = (req, res, next) => {
  const { UserName, Email, Password } = req.body;

  if (!UserName) {
    return res.status(400).json({
      status: 400,
      message: "Tên không được để trống.",
    });
  }

  if (!Email) {
    return res.status(400).json({
      status: 400,
      message: "Email không được để trống.",
    });
  }
  if (!Password) {
    return res.status(400).json({
      status: 400,
      message: "Mật khẩu không được để trống.",
    });
  }

  next();
};
