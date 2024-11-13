const db = require("../db.js");

module.exports = {
  add,
  getBy,
  getAll,
  edit,
  deleteBy,
};

function add(user) {
  return db("users")
    .returning("user_id")
    .insert(user)
    .then(([user_id]) => {
      return getBy(user_id);
    });
}

function getBy(filter) {
  return db("users").first().where(filter);
}

function getAll() {
  return db("users");
}

function edit(user_id, changes) {
  return db("users").where({ user_id }).update(changes);
}

function deleteBy(user_id) {
  return db("users").where({ user_id }).del();
}
