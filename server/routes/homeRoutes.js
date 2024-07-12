const express = require("express");

const router = express.Router();

const authController = require("../controllers/authControllers");

router.get("/", (req, res) => res.send("Home"));
router.get("/protected", authController.protected);
router.post("/refreshtoken", authController.refreshToken);

module.exports = router;
