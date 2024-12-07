import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'mysql2',
        connection: {
            host:  'localhost',
            user: 'root',
            password: '12345',
            database: 'people_management1',
        },
        migrations: {
            directory: './migrations',
        },
        seeds: {
            directory: './db/seeds',
        },
    },
};

export default config;