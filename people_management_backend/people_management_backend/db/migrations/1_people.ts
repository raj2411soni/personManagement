import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
    await knex.schema.createTable('people', (table) => {
        table.increments('id').primary(); 
        table.string('name').notNullable(); 
        table.string('email').unique().notNullable(); 
        table.string('phone_number').notNullable(); 
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

export const down = async (knex: Knex): Promise<void> => {
    await knex.schema.dropTableIfExists('people');
};
