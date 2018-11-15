let mongoose = require('mongoose');
let Client = require('../models/client');

function getClients(req, res) {
    let query = Client.find({});
    query.exec((err, clients) => {
        if (err) res.send(err);
        res.json(clients);
    });
}

function postClient(req, res) {
    var newClient = new Client(req.body);
    newClient.save((err, client) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ message: "Client successfully added!", client });
        }
    });
}

function getClient(req, res) {
    Client.findById(req.params.id, (err, client) => {
        if (err) res.send(err);
        res.json(client);
    });
}

function deleteClient(req, res) {
    Client.remove({ _id: req.params.id }, (err, result) => {
        res.json({ message: "Client successfully deleted!", result });
    });
}

function updateClient(req, res) {
    Client.findById({ _id: req.params.id }, (err, client) => {
        if (err) res.send(err);
        Object.assign(client, req.body).save((err, client) => {
            if (err) res.send(err);
            res.json({ message: 'Client updated!', client });
        });
    });
}

module.exports = { getClients, postClient, getClient, deleteClient, updateClient };