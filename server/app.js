import express from 'express';
import router from './routes/router';

const app = express();

const  port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', router);

const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

module.exports = server;