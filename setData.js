const firebase = require('./firebase_connect');

const { ref } = require("firebase/database");
const { set } = require("firebase/database");
const { database } = require('firebase-functions/v1/firestore');

function saveData(addressbook, callback) {
    const db = firebase.database;
    console.log(addressbook);
    set(ref(db, 'strv-addressbook-' + addressbook.lastName + "-" + addressbook.name), {
        name: addressbook.name,
        lastName: addressbook.lastName,
        phone: addressbook.phone,
        address: addressbook.address
    });
}

module.exports = { saveData };