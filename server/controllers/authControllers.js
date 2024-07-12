const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.trim() !== "" && password.trim() !== "") {
      const user = await User.findOne({ email });
      console.log("user:", user);
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(12));

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser
        .save()
        .then(() => {
          console.log("User created successfully");
          return res.status(201).json({
            message: "User created successfully",
            user: newUser,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({
            message: "Internal server error",
          });
        });
    } else {
      res.status(400).json({
        message: "Please fill all the fields",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.trim() !== "" && password.trim() !== "") {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }
      const userId = user._id;

      jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {
          expiresIn: "20m",
        },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Internal server error",
            });
          }
          return res.status(200).json({
            message: "Login successful",
            token,
          });
        }
      );
    } else {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

exports.protected = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    return res.status(200).json({
      message: "Protected route",
      user,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
