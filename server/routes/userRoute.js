import express from "express";
import { Register, Login } from "../controllers/userController.js";

const Authrouter = express.Router();

Authrouter.post("/register", Register);
Authrouter.post("/login", Login);

export default Authrouter;
