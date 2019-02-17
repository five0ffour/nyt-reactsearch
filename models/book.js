const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AuthorSchema = new Schema({ name: String });
const bookSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: [AuthorSchema], required: true },
  description: String,
  image: String,
  link: String
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
