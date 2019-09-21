const mongoose = require('mongoose');
const promiseRetry = require('promise-retry');
const dbconfig = process.env.TWIT_TEE_DB_CONFIG || 'localhost:27017/twitteedb';

const options = {
  useNewUrlParser: true,
  reconnectTries: 60,
  reconnectInterval: 1000,
  poolSize: 10,
  bufferMaxEntries: 0 // If not connected, return errors immediately rather than waiting for reconnect
}

const promiseRetryOptions = {
  retries: options.reconnectTries,
  factor: 2,
  minTimeout: options.reconnectInterval,
  maxTimeout: 5000
}

const connectDb = (dbconfig) => {
  let url = `mongodb://${dbconfig}`;
  return promiseRetry((retry, number) => {
    console.log(`Connecting to ${url} - retry number: ${number}`)
    return mongoose.connect(url, options).catch(retry)
  }, promiseRetryOptions)
}

// Connect Db
connectDb(dbconfig)
  .then(() => {
    console.log('MongoDB connected. Ready.');
  })
  .catch(err => {
    console.log(err);
  });
  
module.exports = connectDb;