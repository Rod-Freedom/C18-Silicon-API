import express, { urlencoded, json } from 'express';
import { once } from './config/connection.js';
import routes from './routes';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(routes);

once('open', () => {
  app.listen(PORT, () => {
    console.log(`Serving Silicon API on port ${PORT}`);
  });
});