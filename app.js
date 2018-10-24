var express = require('express');
var bodyParser = require('body-parser')
// var mysql = require('mysql');

var firebase = require('firebase-admin');
var firbaseServiceAccount = require('/Users/shrivantbhartia/bbp_backend/bbp-firebase-firebase-adminsdk-flwfg-54c2e98960.json');

firebase.initializeApp({
  credential: firebase.credential.cert(firbaseServiceAccount),
  databaseURL: "https://bbp-firebase.firebaseio.com"
});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
	var firbaseDbUsersRef = firebase.database().ref("users");

	firbaseDbUsersRef.on('value', function(userData) {
	data = userData.val()

		for (idx in data) {
			console.log(idx)
		}

	}, function (error) {
		console.log("Error: " + error.code);
	});
});

app.post('/register', (req, res) => {
	var firbaseDbUsersRef = firebase.database().ref("users");

	firbaseDbUsersRef.on('value', function(userData) {
		data = userData.val()

		allUsernames = []
		
		for (idx in data) {
			allUsernames.push(data[idx]["username"])
		}

		if (allUsernames.includes(req.body.username) == false) {
			firbaseDbUsersRef.push({
				"username": req.body.username,
				"password": req.body.password
			})
			res.send({"message":"new user created"})
		} else {
			res.send({"message":"username exists, so user was not created"})
		}
		firebase.database.goOffline()
	}, function (error) {
		console.log("Error: " + error.code)
		firebase.database.goOffline()
	})
});

app.listen(3000)