
exports.up = function(knex) {
  return knex.schema.createTable('trees', tbl=>{
    tbl.increments() // integer, id column
    tbl.text('region', 120).notNullable()
    tbl.text('municipality', 200).notNullable()
    tbl.text('park').notNullable()
    tbl.text('image').notNullable()
    tbl.timestamps(true, true)
    tbl.decimal('latitude', 10, 8).notNullable()
    tbl.decimal('longitude', 11, 8).notNullable()
  })

  .createTable('history', tbl=>{
    tbl.increments() // integer, id column
    tbl.text('title').notNullable().index()
    tbl.text('report_details')
    tbl.text('image').notNullable()
    tbl.integer('grade', 1).notNullable()
    tbl.timestamps(true, true)
    tbl.integer('tree_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
  })


};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('trees').dropTableIfExists('history')
};
