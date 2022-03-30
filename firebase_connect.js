const { initializeApp } = require('firebase/app');
const { getDatabase } = require("firebase/database");

const app = initializeApp({
    apiKey: "AIzaSyDvNfDXsU1Okh-vjBhCJhQb17PSugMwyBw",
    authDomain: "addressbook-e4008.firebaseapp.com",
    databaseURL: "https://addressbook-e4008-default-rtdb.firebaseio.com/",
    projectId: "addressbook-e4008",
    storageBucket: "addressbook-e4008.appspot.com",
    messagingSenderId: "668538633568",
    appId: "1:668538633568:web:0412cfd7d092fa81a2b205"
});

// Get a reference to the database service
const database = getDatabase(app);
module.exports = {
    app,
    database
}