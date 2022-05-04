const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  logInValidation,
  TokenValidation,
} = require("../utils/validators");
const generateTokens = require("../utils/tokenGenerator");

module.exports = {
  async login(req, res) {
    try {
      const { error } = logInValidation(req.body);
      if (error)
        return res
          .status(400)
          .json({ error: true, message: error.details[0].message });

      const user = await User.findOne({ email: req.body.email });
      if (!user)
        return res
          .status(401)
          .json({ error: true, message: "Invalid email or password" });
      const verifiedPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!verifiedPassword)
        return res
          .status(401)
          .json({ error: true, message: "Invalid email or password" });

      const { accessToken } = await generateTokens(user);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
      });
      let userDetails = {...user._doc}
      delete userDetails._id;
      delete userDetails.password;
      res.status(200).json({
        error: false,
        // refreshToken,
        message: "Logged in sucessfully",
        user: userDetails,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  },
  //   async refreshToken(req, res) {
  //     const { error } = refreshTokenValidation(req.body);
  //     if (error)
  //       return res
  //         .status(400)
  //         .json({ error: true, message: error.details[0].message });
  //     verifyRefreshToken(req.body.refreshToken)
  //       .then(({ tokenDetails }) => {
  //         const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
  //         const accessToken = jwt.sign(
  //           payload,
  //           process.env.ACCESS_TOKEN_PRIVATE_KEY,
  //           { expiresIn: "14m" }
  //         );
  //         res.status(200).json({
  //           error: false,
  //           accessToken,
  //           message: "Access token created successfully",
  //         });
  //       })
  //       .catch((err) => res.status(400).json(err));
  //   },
  async logout(req, res) {
    try {
      const { error } = TokenValidation(req.cookies);
      if (error)
        return res
          .status(400)
          .json({ error: true, message: error.details[0].message });
      res.clearCookie("accessToken");
      res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  },
  async getProfile(req, res) {
    try {
      let user = await User.findOne(
        { _id: req.userId },
        { _id: 0, password: 0 }
      );
      res.status(200).json({ error: false, message: "User Found", user });
    } catch (error) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  },
  async updateProfile(req, res) {
    try {
      await User.updateOne({ _id: req.userId }, { theme: req.body.theme });
      let user = await User.findOne(
        { _id: req.userId },
        { _id: 0, password: 0 }
      );
      res.status(200).json({ error: false, message: "User Found", user });
    } catch (err) {
      res.status(500).json({ error: true, message: "Internal Server Error" });
    }
  },
};
