const express = require("express");

const router = express.Router();

const authController = require("../controllers/authControllers");

router.get("/login", (req, res) => res.send("login page"));
router.post("/login", authController.login);

router.get("/signup", (req, res) => res.send("Signup Page"));
router.post("/signup", authController.signup);

module.exports = router;
