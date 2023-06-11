import { Router } from "express";

import {
  createsimpleTable,
  postData,
  getAll,
  getOne,
  editOne,
  deleteContent,
} from "../controller/sample.controller.js";

export const weeb = Router();

weeb.route("/createtable").get(createsimpleTable);

weeb.route("/").get(getAll).post(postData);

weeb.route("/:id").get(getOne).delete(deleteContent).patch(editOne);

//* [We can use put method and a patch method in order to update our data]
// todo: [The main difference between put and patch is the put request updated whole data]
// todo: [Whereas the patch method only updates only passed data if data of body is not passed it will not update the body]
