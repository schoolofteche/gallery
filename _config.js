
// var config = {}

// // Update to have your correct username and password
// config.mongoURI = {
//     production: 'mongodb+srv://schooloftecheinfo:r0nrrlUxZVTjZg8V@gallery.wc344.mongodb.net/darkroom?retryWrites=true&w=majority',
//     development: 'mongodb+srv://schooloftecheinfo:r0nrrlUxZVTjZg8V@gallery.wc344.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
//     test: 'mongodb+srv://schooloftecheinfo:r0nrrlUxZVTjZg8V@gallery.wc344.mongodb.net/darkroom-test?retryWrites=true&w=majority',
// }
// module.exports = config;


const config = {}

config.mongoURI = {
  production: process.env.MONGO_URL,
  development: process.env.MONGO_URL,
  test: process.env.MONGO_URL
}

module.exports = config;



