var firebase = require("firebase/app");
require("firebase/database");

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  databaseURL: process.env.REACT_APP_DB_URL
};
// Initialize Firebase
firebase.initializeApp(config);
const database = firebase.database();

export default database;
