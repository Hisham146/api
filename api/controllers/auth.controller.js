import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);

    const existingEmail = await User.findOne({ email: req.body.email });


    if (existingEmail) {
      return res.status(400).send("Email already exists*");
    };
    
   

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).send("Username already exists*");
    }

    const newUser = new User({
      ...req.body,
      password: hash,
    });

  const user = await newUser.save();

		res.status(200).send("User Registered", user);
  
  } catch (err) {
    next(err);
  }
};


export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

   const blockedStatus = user.isBlocked
   if(blockedStatus) return next(createError(400, "You Account is Blocked"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));


    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1d", // Token will expire after one day
      }
    );
  
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  
    

  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    }).status(200).send("User has been logged out.");
};
