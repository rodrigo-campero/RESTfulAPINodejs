
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let client = require('./app/routes/client');
let config = require('config');

let options = {
	server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
	replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if (config.util.getEnv('NODE_ENV') !== 'test') {
	app.use(morgan('combined'));
}


app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get("/", (req, res) => res.json({ message: "Welcome to our Bookstore!" }));

app.route("/client")
	.get(client.getClients)
	.post(client.postClient);
app.route("/client/:id")
	.get(client.getClient)
	.delete(client.deleteClient)
	.put(client.updateClient);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app;