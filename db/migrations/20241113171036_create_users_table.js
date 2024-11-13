/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (tbl) {
    tbl.uuid("user_id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    tbl.string("username").notNullable().unique();
    tbl.string("email").notNullable().unique();
    tbl.string("password_hash").notNullable();
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
