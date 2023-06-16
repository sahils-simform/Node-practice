/* eslint-disable no-console */

// const crypto = require('crypto');

// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
// const { validationResult } = require('express-validator/check');

// const User = require('../models/user');

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key:
//         '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'
//     }
//   })
// );
const getLogin = async (req, res) => {
  try {
    const isLoggedIn = await req
      .get("cookie")
      .split(";")[1]
      .trim()
      .split("=")[1];
    console.log(isLoggedIn);
    res.status(200).json({
      status: "success",
      message: "Add your login credentials",
      isAuthenticated: req.isLoggedIn,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Something is wrong",
    });
  }
};

const postLogin = async (req, res) => {
  try {
    await res.setHeader("Set-Cookie", "loggedIn=true");
    res.status(200).json({
      status: "success",
      message: "Logged successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Something is wrong",
    });
  }
};

module.exports = { getLogin, postLogin };
