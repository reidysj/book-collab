const db = require("../db.js");

module.exports = {
  add,
  getBy,
  edit,
  deleteBy,
};

function add(chapter) {
  return db("chapters")
    .returning("chapter_id")
    .insert(chapter)
    .then(([chapter_id]) => {
      return getBy(chapter_id);
    });
}

function getBy(filter) {
  return db("chapters").where(filter);
}

function edit(chapter_id, changes) {
  return db("chapters").where({ chapter_id }).update(changes);
}

function deleteBy(chapter_id) {
  return db("chapters").where({ chapter_id }).del();
}
