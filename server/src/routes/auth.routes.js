const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const { checkIsEmpty } = require("../middlewares/auth.middleware");

authRouter.post("/register", checkIsEmpty, authController.register);
authRouter.post("/login", authController.login);

module.exports = authRouter;
