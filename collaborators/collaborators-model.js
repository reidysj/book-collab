const db = require("../db.js");

module.exports = {
  add,
  findOne,
  getBy,
  deleteBy,
};

function add(collaborator) {
  return db("collaborators")
    .returning("book_id")
    .insert(collaborator)
    .then(([book_id]) => {
      return getBy(book_id);
    });
}

function getBy(filter) {
  return db("collaborators").where(filter);
}

function findOne(filter) {
  return db("collaborators").where(filter).first();
}

function deleteBy(collaborator_id) {
  return db("collaborators").where({ collaborator_id }).del();
}
