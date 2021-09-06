import mysql from "mysql";

export const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWOR,
  database: process.env.DATABASE,
});
