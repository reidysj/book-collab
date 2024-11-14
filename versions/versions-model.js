const db = require("../db.js");

module.exports = {
  add,
  getBy,
};

function add(version) {
  return db("versions")
    .returning("version_id")
    .insert(version)
    .then(([version_id]) => {
      return getBy(version_id);
    });
}

function getBy(filter) {
  return db("versions").where(filter);
}
