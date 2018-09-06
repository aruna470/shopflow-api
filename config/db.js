var mongoose = require('mongoose');

// ES6 promises
mongoose.Promise = Promise;

// mongodb connection
mongoose.connect(process.env.MONGO_URL || "mongodb://xxx:nxxxx@localhost:27017/xxx", {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

var db = mongoose.connection;

// mongodb error
db.on('error', console.error.bind(console, 'connection error:'));

// mongodb connection open
db.once('open', () => {
  console.log(`Connected to Mongo at: ${new Date()}`)
});
