const authService = require("../services/auth.service");

module.exports.register = async (req, res) => {
  await authService.register(req.body);
};
module.exports.login = () => {};
