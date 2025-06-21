const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// connecting the database
// let mongodb_url = 'mongodb+srv://schooloftecheinfo:r0nrrlUxZVTjZg8V@cluster.mongodb.net/darkroom?retryWrites=true&w=majority';
// let mongodb_url = 'mongodb+srv://schooloftecheinfo:r0nrrlUxZVTjZg8V@myip.0xndgzz.mongodb.net/?retryWrites=true&w=majority&appName=MyIP';
// let mongodb_url = 'mongodb+srv://schooloftecheinfo:r0nrrlUxZVTjZg8V@myip.0xndgzz.mongodb.net/darkroom?retryWrites=true&w=majority&appName=MyIP';

// let dbName = 'darkroom';
// mongoose.connect(`${mongodb_url}${dbName}`,{ useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
//     if (err) console.log(err)
// });

const config = require('./_config');
const env = process.env.NODE_ENV || 'production';
const mongoURI = config.mongoURI[env];



// const config = require('./_config');

// const env = process.env.NODE_ENV || 'development';
// const mongoURI = config.mongoURI[env];

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`✅ Connected to MongoDB (${env} environment)`);
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});



// test if the database has connected successfully
let db = mongoose.connection;
db.once('open', ()=>{
    console.log('Database connected successfully')
})

// Initializing the app
const app = express();


// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);



 
// const PORT = process.env.PORT || 5000;
// app.listen(PORT,() =>{
//     console.log(`Server is listening at http://localhost:${PORT}`)
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening at http://0.0.0.0:${PORT}`);
});


