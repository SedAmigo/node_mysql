import { json, urlencoded } from "express";
import moment from "moment";
import dotenv from "dotenv";
dotenv.config();

export const serUpMiddleware = (app) => {
  const logger = (req, res, next) => {
    console.log(
      `${req.protocol}://${req.get("host")}${
        req.originalUrl
      }:${moment().format()}`
    );
    next();
  };

  app.use(logger);
  app.use(json());
  app.use(urlencoded({ extended: true }));
};
