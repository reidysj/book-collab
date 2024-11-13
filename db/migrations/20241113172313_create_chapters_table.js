/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("chapters", function (tbl) {
    tbl.uuid("chapter_id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    tbl
      .uuid("book_id")
      .references("book_id")
      .inTable("books")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.string("title");
    tbl.text("content");
    tbl.integer("order");
    tbl.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("chapters");
};
