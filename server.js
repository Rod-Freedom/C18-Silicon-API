import express, { urlencoded, json } from 'express';
import siliconDB from './config/connection.js';
import router from './routes/router.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(router);

siliconDB.once('open', () => {
  app.listen(PORT, () => console.log(`Serving Silicon API on port ${PORT}`));
});