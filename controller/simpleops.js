import { conn } from "../server.js";

export const createsimpleTable = async (req, res) => {
  let sql =
    "CREATE TABLE IF NOT EXISTS weeb_in(id int PRIMARY KEY AUTO_INCREMENT, name VARCHAR(225) NOT NULL, reason VARCHAR(500) NOT NULL)";

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

export const postData = (req, res) => {
  let sql = "INSERT INTO weeb_in SET ?";
  let params = req.body;

  conn.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      console.log(result);
      res.status(200).json({ success: req.body });
    }
  });
};

export const getAll = async (req, res) => {
  let sql = "SELECT * FROM weeb_in";

  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      console.log(result);
      res.status(200).json({ animes: result });
    }
  });
};

export const getOne = (req, res) => {
  let sql = "SELECT * FROM weeb_in WHERE id = ?";
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      //! Select checks if any data or some single data which will passes the test provided in the given function
      //! here it checks if any data has same id as req.param.id if it has it returns true
      //! works if there is unique data in this case
      const found = result.some(
        (result) => result.id.toString() === req.params.id
      );
      if (found) {
        console.log(result);
        res.status(200).json({ anime: result });
      } else {
        res.status(400).json({
          error: `Data for given ID : ${req.params.id} cannot be found`,
        });
      }
    }
  });
};

export const editOne = (req, res) => {
  let id = req.params.id;
  let name = req.body.name;
  let reason = req.body.reason;
  let sql = "UPDATE weeb_in SET name = ?, reason = ? WHERE id = ? ";
  conn.query(sql, [name, reason, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: err });
    } else {
      if (result.affectedRows == 0) {
        res.status(400).json({
          error: `Data for given ID : ${req.params.id} cannot be found`,
        });
      } else {
        console.log(result);
        res.status(200).json({ success: req.body });
      }
    }
  });
};

export const deleteContent = (req, res) => {
  let sql = "DELETE FROM weeb_in WHERE id = ?";
  conn.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      if (result.affectedRows == 0) {
        res.status(400).json({
          error: `Data for given ID : ${req.params.id} cannot be found`,
        });
      } else {
        console.log(result);
        res.status(200).json({ animes: "Row deleted sucessfully" });
      }
    }
  });
};
