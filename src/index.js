import '@babel/polyfill';
import express from 'express';
import { config } from './config';
import { market } from './routes';

const app = express();
app.use(express.json());

const port = config.appPort;

app.use('/api/v1', market);
app.listen(port, () => console.log(`Running on localhost:${ port }`));