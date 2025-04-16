import pg from "pg";

const repo = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'zoo',
    password: '111',
    port: 5432,
});

export default {repo}