const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const arp = require('node-arp');
const get_ip = require('ipware')().get_ip;
const p = require('ua-parser');
const client = require('twilio')('ACb8d8748cf32763120cbded21c1666f94', '946d4414b89517993078c7a7dd1d10d1');
const sys = require('sys');
const exec = require('child_process').exec;
const geoip = require('geoip-lite');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
//express
const app  = express();
const port = process.env.PORT || 8080;
//view engine
app.set('views', './views');
app.set('view engine', 'pug');
//middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
//database
const connection = mysql.createConnection({
	host: '192.237.207.37',
	user: 'root',
	password: 'syner',
	database: 'SharedFi'
});
connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else{
  	console.log('connected as id ' + connection.threadId);	
  }
});

//get
require('./routes/get/view-get')(app, p, get_ip, geoip);
require('./routes/get/login-options-get')(app, connection);
//post
require('./routes/post/send-message-post')(app, client);
require('./routes/post/send-email-post')(app, nodemailer);
require('./routes/post/submit-info-email')(app, connection, arp, sys, exec, get_ip);
require('./routes/post/submit-info-post')(app,connection);
require('./routes/post/update-info-post')(app,connection);
require('./routes/post/allow-user-post')(app, arp, sys, exec, get_ip);
//start server
const listener = app.listen(port, () => {
	console.log('Listening on port ' + listener.address().port);
});
