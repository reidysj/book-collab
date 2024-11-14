const db = require("../db.js");

module.exports = {
  add,
  getBy,
  deleteBy,
};

function add(comment) {
  return db("comments")
    .returning("comment_id")
    .insert(comment)
    .then(([comment_id]) => getBy(comment_id));
}

function getBy(filter) {
  return db("comments").where(filter);
}

function deleteBy(comment_id) {
  return db("comments").where({ comment_id }).del();
}
