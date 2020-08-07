import express from 'express';
var app = express();
import bodyParser from "body-parser";
import db from './config/db.connection.js'
import employeeRouter from './routes/employee.routes.js';
import userRouter from './routes/user.routes.js';
import UserController from './controller/user.controller.js';
import cors from 'cors';
import unless from 'express-unless';
import morgan from 'morgan';
import path from 'path';
import rfs from 'rotating-file-stream';

let user = new UserController();
// Then use it before your routes are set up:
app.use(cors());
// logging
const __dirname = path.resolve();
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

user.authenticateJWT.unless = unless;
app.use(user.authenticateJWT.unless({ path: ['/register','/login'] }));

app.use('/', employeeRouter);
app.use('/', userRouter);

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log("connected to db server");
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
    next();
})
app.listen(process.env.PORT, () => {
    console.log("Server listening on port 3000");
});
