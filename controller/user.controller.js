import { conn } from "../utils/database.js";
import { genSaltSync, hashSync } from "bcrypt";
export const createUserTable = async (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS registration(id int PRIMARY KEY AUTO_INCREMENT, firstName VARCHAR(100) NOT NULL,lastName VARCHAR(100) NOT NULL, gender VARCHAR(10) NOT NULL,email VARCHAR(200) NOT NULL,password VARCHAR(100) NOT NULL,number int NOT NULL)";

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
      throw err;
    } else {
      console.log(result);
      res.status(200).json({ success: "Table Created sucessfully" });
    }
  });
};

export const registerUser = (req, res) => {
  let sql =
    "INSERT INTO registration(firstName , lastName , gender , email , password , number) values(?,?,?,?,?,?)";
  let param = req.body;
  const salt = genSaltSync(10);
  param.password = hashSync(param.password, salt);
  conn.query(
    sql,
    [
      param.firstName,
      param.lastName,
      param.gender,
      param.email,
      param.password,
      param.number,
    ],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err });
      } else {
        console.log(result);
        res.status(200).json({ success: req.body });
      }
    }
  );
};

export const getUsers = (req, res) => {
  let sql =
    "SELECT id , firstName , lastName, gender,email,number from registration";

  conn.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: err });
    } else {
      console.log(result);
      res.status(200).json({ users: result });
    }
  });
};

export const getSingleUSer = (req, res) => {
  let sql =
    "SELECT id,firstName,lastName,gender,email,number FROM registration WHERE id = ?";
  conn.query(sql, [req.params.id], (err, result) => {
    const found = result.some(
      (result) => result.id.toString() === req.params.id
    );
    if (found) {
      console.log(result);
      res.status(200).json({ user: result });
    } else {
      res.status(400).json({
        error: `Data for given ID : ${req.params.id} cannot be found`,
      });
    }
  });
};

export const updateUSer = (req, res) => {
  let sql =
    "UPDATE registration SET firstName=?, lastName=?, gender=?, email=?, password=?, number=? WHERE id = ?";
  let param = req.body;
  const salt = genSaltSync(10);
  param.password = hashSync(param.password, salt);

  conn.query(
    sql,
    [
      param.firstName,
      param.lastName,
      param.gender,
      param.email,
      param.password,
      param.number,
      req.params.id,
    ],
    (err, result) => {
      console.log(param.id);
      if (err) {
        console.log(err);
        res.status(400).json({ error: err });
      } else {
        if (result.affectedRows == 0) {
          res.status(400).json({
            error: `User for given ID : ${req.params.id} cannot be found`,
          });
        } else {
          console.log(result);
          res.status(200).json({ success: "User updated sucessfully" });
        }
      }
    }
  );
};

export const deleteUSer = (req, res) => {
  let sql = "DELETE FROM registration WHERE id = ?";
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (result.affectedRows == 0) {
        res.status(400).json({
          error: `User for given ID : ${req.params.id} cannot be found`,
        });
      } else {
        console.log(result);
        res.status(200).json({ animes: "User deleted sucessfully" });
      }
    }
  });
};