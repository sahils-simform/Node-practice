/* eslint-disable no-console */

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
