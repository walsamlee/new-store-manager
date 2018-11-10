import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Pool({
    connectionString: process.env.DATABASE_URL
});


client.connect((err) => {
    if(!err) return console.log('Connected to db');
});

export default client;