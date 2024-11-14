const db = require("../db.js");
//TODO make all these models transformable
module.exports = {
  add,
  getAll,
  getBy,
  edit,
  deleteBy,
};

function add(book) {
  return db("books")
    .returning("book_id")
    .insert(book)
    .then(([book_id]) => {
      return getBy(book_id);
    });
}

function getBy(filter) {
  return db("books").first().where(filter);
}

function getAll() {
  return db("books");
}

function edit(book_id, changes) {
  return db("books").where({ book_id }).update(changes);
}

function deleteBy(book_id) {
  return db("books").where({ book_id }).del();
}
