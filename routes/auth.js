const express = require("express");

// const expValidator = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

module.exports = router;
