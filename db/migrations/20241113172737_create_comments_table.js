/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", function (tbl) {
    tbl.uuid("comments_id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    tbl
      .uuid("chapter_id")
      .references("chapter_id")
      .inTable("chapters")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl
      .uuid("user_id")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.text("content");
    tbl.timestamp("created_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
