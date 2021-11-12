import express from 'express';
import njk from 'nunjucks';
import path from 'path';
import { fileURLToPath } from 'url';
import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import router from './routes/index.js';
import authorRouter from './routes/authors.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// __dirname and __filename fix for ECMAScript module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

njk.configure(
  "views", {
    express: app
  }
);

app.set('view engine', 'njk');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

Mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = Mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log("Connected to Mongoose"));

app.use('/', router);
app.use('/authors', authorRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening to port ${process.env.PORT || 3000}. http://localhost:${process.env.PORT, 3000}`)
});