exports.up = function(knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.boolean('completed');
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};
