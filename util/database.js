/* eslint-disable no-console */
const mongodb = require("mongodb");

const { MongoClient } = mongodb;
let db1;
const mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017/shop")
    .then((client) => {
      db1 = client.db();
      const collection = db1.collection("users");
      console.log(collection);

      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  try {
    if (db1) {
      console.log(db1);
    }
  } catch {
    console.log("No database found!");
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
