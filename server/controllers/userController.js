import express from "express";
import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User Already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User({
      userName: userName,
      email: email,
      password: hashedPassword,
      createdAt: Date.now(),
    });
    await user.save();
    return res.status(201).json({ msg: "User created sucessfully!!! " });
  } catch (err) {
    return res.status(500).json({ error: "Error: " + err });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginUser = await User.findOne({ email });
    if (!loginUser) {
      return res.status(404).json({ msg: "User Not Found!!!" });
    }
    console.log(loginUser);
    const isPassword = await bcrypt.compare(password, loginUser.password);
    if (isPassword) {
      const token = jwt.sign(
        {
          userName: loginUser.userName,
          email: loginUser.email,
          createdAt: Date.now(),
        },
        process.env.JWT_KEY
      );
      console.log(token);
      return res
        .status(200)
        .json({ msg: "Login into your account successfully!!!", token: token });
    }
  } catch (err) {
    return res.status(401).json({ msg: "Email or password wrong" });
  }
};

export const Logout = async (req, res) => {
  res.status(200).json({ msg: "response successfull" });
};

export const getScholarship = async (req, res) => {
  try {
  } catch (err) {}
};
