import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";

// Authenticated User Function

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, "User not authenticated");
    }

    const user = await UserModel.findById(authenticatedUserId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}
// Creating SIGNUP functio
export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;

  try {
    // check fields
    if (!username || !email || !passwordRaw) {
      throw createHttpError(
        400,
        "Parameters missing, Make sure you fill the form"
      );
    }

    // check if username already exist
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();
    if (existingUsername) {
      throw createHttpError(
        409,
        "Username already exist. Please choose another one or Login instead"
      );
    }
    // check if email exist
    const existingEmail = await UserModel.findOne({ email: email }).exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        "a User with this Email already exist. Please Login instead"
      );
    }
    // hashign Password
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    // Create a new user
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });
    //  this is a part for creating a session for a user
    req.session.userId = newUser._id;

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Creating LOGIN functio
interface LoginBody {
  username?: string;
  password?: string;
}

export const logIn: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // checking information
    if (!username || !password) {
      throw createHttpError(400, "Parameters is messing, try again ");
    }

    // checking the username validity
    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();
    if (!user) {
      throw createHttpError(401, "Invalid credentials");
    }
    // checking the Password validity
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }
    req.session.userId = user._id;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// logout Function

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    error ? next(error) : res.sendStatus(200);
  });
};
