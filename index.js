const functions = require("firebase-functions");

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ofirebase = require('./setData');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const app = express();
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://admin-Hamid:hamid123@cluster0.oewjw.mongodb.net/addressBook");

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

const addressSchema = {
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    }
};

const Address = mongoose.model("address", addressSchema);

const LoginSchema = {
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}

const Login = mongoose.model("login", LoginSchema);

app.get("/", function(req, res) {
    res.redirect("login");
});

app.get("/home", function(req, res) {
    res.render("home");
});

app.post("/home", function(req, res) {
    let user = req.body.user;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let phone = req.body.phone;
    let email = req.body.email;
    let address = req.body.address;
    const addressBook = new Address({
        name: firstname,
        lastName: lastname,
        phone: phone,
        email: email,
        address: address
    });
    ofirebase.saveData(addressBook, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Data saved successfully!");
        }
    });
    res.render("home", { User: user });
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/signup", function(req, res) {
    res.render("signup");
});

app.post("/login", function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    Login.findOne({ email: email }, function(err, foundLogin) {
        if (foundLogin) {
            if (foundLogin.password === password) {
                console.log("Successfully logged in.");
                res.render("home", { User: foundLogin.email });
            } else {
                console.log("Wrong password.");
                res.redirect("/login");
            }
        } else {
            console.log("User not found.");
            res.redirect("/signup");
        }
    });
});

app.post("/signup", function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    const login = new Login({
        email: email,
        password: password
    });
    Login.findOne({ email: email }, function(err, foundLogin) {
        if (foundLogin) {
            console.log("User already exists.");
            res.redirect("/login");
        } else {
            login.save();
            console.log("Successfully signed up.");
            res.render("home", { User: email });
        }
    });
});

app.post("/logout", function(req, res) {
    res.redirect("/login");
});

app.listen(port, function() {
    console.log(`App is listening on ${port} `);
});