import { Request, Response } from "express";
import { ErrorWithStatus } from "../middlewares/errorHandler.js";
import { createUser, getUser } from "../services/userService.js";

export async function signUp(req: Request, res: Response) {
  const { username, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    throw new ErrorWithStatus(400, "Password is not confirmed");
  }

  const user = await getUser({ email: email });
  if (user) {
    throw new ErrorWithStatus(400, "Email is not unique");
  }

  await createUser({ username: username, email: email, password: password });

  res.json({ message: "OK" });
}