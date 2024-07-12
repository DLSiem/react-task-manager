const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

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
