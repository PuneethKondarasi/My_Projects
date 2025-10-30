import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "Kvsp@1480",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    console.log(result.rows);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: result.rows,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  if (item) {
    try {
      await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
      console.log("Item added successfully");
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.send("Error adding item to database.");
    }
  } else {
    console.log("No item to add");
    res.redirect("/");
  }
});

app.post("/edit", async (req, res) => {
  const itemId = req.body.updatedItemId;
  const newTitle = req.body.updatedItemTitle;
  try {
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [newTitle, itemId]);
    console.log("Item updated successfully");
    res.redirect("/");
  } catch  (err) {
    console.error(err);
    res.send("Error updating item in database.");
  }
});

app.post("/delete", (req, res) => {
  const itemId = req.body.deleteItemId;
  try {
    db.query("DELETE FROM items WHERE id = $1", [itemId]);
    console.log("Item deleted successfully");
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error deleting item from database.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
