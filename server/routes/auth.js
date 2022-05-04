const AuthController = require("../controllers/authController");
const VerifyToken = require("../middlewares/verifyToken");

module.exports = (router) => {
  router.post("/login", AuthController.login);
  router.post("/logout", VerifyToken, AuthController.logout);
  router.get("/me", VerifyToken, AuthController.getProfile);
  router.put("/me", VerifyToken, AuthController.updateProfile);
};
