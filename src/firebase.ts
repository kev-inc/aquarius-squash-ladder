var firebase = require("firebase/app");
require("firebase/database");

const config = {
  apiKey: process.env.API_KEY,
  databaseURL: process.env.DB_URL
};
// Initialize Firebase
firebase.initializeApp(config);
const database = firebase.database();

export default database;
