import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { config } from 'dotenv';
import entities from './entities';

config();

(async (): Promise<void> => {
    await createConnection({
        type: 'postgres',
        database: process.env.PROD_DB_DBNAME || process.env.DEV_DB_DBNAME,
        username: process.env.PROD_DB_USERNAME || process.env.DEV_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD || process.env.DEV_DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: entities,
    });

    const app = express();
    const domain = process.env.PROD_DOMAIN || process.env.DEV_DOMAIN;
    const port = process.env.PROD_PORT || process.env.DEV_PORT;

    app.listen(port, () =>
        console.log(`Server is running at ${domain}:${port}`)
    );
})().catch((err) => console.error(err.message));
