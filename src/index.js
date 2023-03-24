import express from 'express';
import { engine } from 'express-handlebars';
import myconnection from 'express-myconnection';
import mysql from 'mysql';
import session from 'express-session';
import bodyParser from 'body-parser';
import loginRoutes from './routes/login.js';
import childrenRoutes from './routes/children.js';
import eventRoutes from './routes/event.js';
import routes from './routes/index.js';
import path from 'path';
import indexRouter from './routes/index.routes.js';
import Handlebars from './lib/handlebars.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import multer from 'multer'; //libreria de imagenes

const app = express();

//Settings
app.set('port', 4000);
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: Handlebars
}));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'ccsandiego1'
}, 'single'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
  // signed: true
}));

//middlewares

const storage = multer.diskStorage({
  destination: path.join(__dirname, '/public/uploads'),
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

app.use(multer({
  storage,
  dest: path.join(__dirname, 'public/uploads'),
  limits:{fileSize: 20000000},
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname); {
      return cb(null, true);
    }
    cb("Error: Archivo debe ser una imagen valida");
  }
}).single('firma'));

//Routes
app.use(indexRouter);
app.use(routes);
app.use(loginRoutes);
app.use(childrenRoutes);
app.use(eventRoutes);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Start the server
app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});



