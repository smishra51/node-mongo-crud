import mongoose from 'mongoose';
var mongoDB = process.env.DB_URL;
 
const options = { 
    useUnifiedTopology: true,
    useNewUrlParser: true ,
    dbName: process.env.DB_NAME
  };
mongoose.connect(mongoDB, options);
var db = mongoose.connection;

export default db;
