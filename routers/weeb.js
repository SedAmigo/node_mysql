import { Router } from "express";

import {
  createsimpleTable,
  postData,
  getAll,
  getOne,
  editOne,
  deleteContent,
} from "../controller/simpleops.js";

export const weeb = Router();

weeb.route("/createtable").get(createsimpleTable);

weeb.route("/").get(getAll).post(postData);

weeb.route("/:id").get(getOne).delete(deleteContent);

weeb.route("/:id").put(editOne);
