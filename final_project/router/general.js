const express = require("express");
const axios = require("axios"); // required for assignment
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

// ✅ Register
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (isValid(username)) {
    return res.status(404).json({ message: "User already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered" });
});

// ✅ Get all books (ASYNC)
public_users.get("/", async (req, res) => {
  try {
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// ✅ Get book by ISBN (ASYNC)
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn]);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching book" });
  }
});

// ✅ Get by author (ASYNC)
public_users.get("/author/:author", async (req, res) => {
  try {
    const author = req.params.author;

    const result = Object.values(books).filter(
      (book) => book.author.toLowerCase() === author.toLowerCase(),
    );

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching author books" });
  }
});

// ✅ Get by title (ASYNC)
public_users.get("/title/:title", async (req, res) => {
  try {
    const title = req.params.title;

    const result = Object.values(books).filter(
      (book) => book.title.toLowerCase() === title.toLowerCase(),
    );

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching title" });
  }
});

// ✅ Get reviews (ASYNC)
public_users.get("/review/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn].reviews);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching review" });
  }
});

module.exports.general = public_users;
