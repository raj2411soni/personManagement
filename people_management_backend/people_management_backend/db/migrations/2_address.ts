import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
    await knex.schema.createTable('addresses', (table) => {
        table.increments('id').primary(); 
        table.integer('person_id').unsigned().notNullable().references('id').inTable('people').onDelete('CASCADE'); 
        table.string('address').notNullable(); 
        table.boolean('is_primary').defaultTo(false); 
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

export const down = async (knex: Knex): Promise<void> => {
    await knex.schema.dropTableIfExists('addresses');
};
