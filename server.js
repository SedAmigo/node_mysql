import express from "express";
import { serUpMiddleware } from "./utils/middleware.js";
import { conn } from "./utils/database.js";
import { API_ROUTES } from "./constants/index.js";
import { routers } from "./routers/index.js";
const app = express();

serUpMiddleware(app);
var port = process.env.PORT || 3000;

app.use(API_ROUTES.WEEB, routers.weebRouter);

export const startServer = (req, res) => {
  try {
    app.listen(port, () => {
      console.log(`Application is running on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
  conn.connect((err) => {
    if (err) {
      console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
      throw err;
    } else {
      console.log("Connection Established Successfully");
    }
  });
};
