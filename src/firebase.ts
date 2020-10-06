var firebase = require("firebase/app");
require("firebase/database");
require("dotenv").config();

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: "aquarius-squash"
};
// Initialize Firebase
firebase.initializeApp(config);
const database = firebase.database();

export default database;
