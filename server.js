const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');
const index = require('./routes/index');
const image = require('./routes/image');

const app = express();

// View Engine
app.set('view engine', 'ejs');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', index);
app.use('/image', image);

// Default route (for test)
app.get('/', (req, res) => {
  res.status(200).send({ message: 'All photos here' });
});

// Mongo URI resolution
const env = process.env.NODE_ENV || 'development';
const mongoURI =
  process.env.MONGO_URL || config.mongoURI?.[env] || 'mongodb://localhost:27017/darkroom';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`✅ MongoDB connected (${env} environment)`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Server startup logic
const PORT = process.env.PORT || 5000;
let server = null;

if (env !== 'test') {
  server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running at http://0.0.0.0:${PORT}`);
  });
}

// Export app and server for testing
module.exports = { app, server };
