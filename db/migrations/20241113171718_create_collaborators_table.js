/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("collaborators", function (tbl) {
    tbl.uuid("collaborator_id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    tbl
      .uuid("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .uuid("book_id")
      .references("book_id")
      .inTable("books")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("role");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("collaborators");
};
