/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("books", function (tbl) {
    tbl.uuid("book_id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    tbl.string("title").notNullable();
    tbl.text("description");
    tbl
      .uuid("created_by")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("books");
};
