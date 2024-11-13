/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("versions", function (tbl) {
    tbl.uuid("version_id", { primaryKey: true }).defaultTo(knex.fn.uuid());
    tbl
      .uuid("chapter_id")
      .references("chapter_id")
      .inTable("chapters")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.integer("version_number");
    tbl.text("content");
    tbl
      .uuid("created_by")
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.timestamp("created_at");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("versions");
};
