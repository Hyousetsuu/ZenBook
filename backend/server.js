const express = require("express");
const cors = require("cors");

const books = require("./data/books.json");
const recommendations = require("./data/recommendations.json");

const app = express();

app.use(cors());
app.use(express.json());

/*
 * GET ALL BOOKS
 */
app.get("/books", (req, res) => {
  res.json(books);
});

/*
 * GET RECOMMENDATION BY ISBN
 */
app.get("/recommend/:isbn", (req, res) => {

  const isbn = req.params.isbn;

  const result = recommendations[isbn];

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Recommendation not found"
    });
  }

  res.json({
    success: true,
    isbn,
    recommendations: result
  });
});

app.listen(5000, () => {
  console.log(
    "Server running on http://localhost:5000"
  );
});