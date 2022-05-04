const jwt = require("jsonwebtoken");

const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "15m" }
    );
    // const refreshToken = jwt.sign(
    //   payload,
    //   process.env.REFRESH_TOKEN_PRIVATE_KEY,
    //   { expiresIn: "30d" }
    // );
    return Promise.resolve({ accessToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports =  generateTokens;
