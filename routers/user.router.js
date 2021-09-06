import { Router } from "express";

import {
  createUserTable,
  registerUser,
  getUsers,
  getSingleUSer,
  updateUSer,
  deleteUSer,
} from "../controller/user.controller.js";

export const user = Router();

user.route("/createusertable").get(createUserTable);

user.route("/").post(registerUser);

user.route("/").get(getUsers);

user.route("/:id").get(getSingleUSer).delete(deleteUSer).patch(updateUSer);
