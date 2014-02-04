var express = require('express');
var _ = require('lodash');
var repository = require('./lib/mongo-repository');
var guid = require('./lib/guid-translation');

var knownEventStores = [
  { id: "risk",     name: "Home - Risk",      db: 'eventstore_home_risk'},
  { id: "enquiry",  name: "Panel - Enquiry",  db: 'eventstore_panel_enquiry'},
];

var environments = [
  { id: "local",  name: "Local",        url: 'mongodb://localhost:27017/'},
  { id: "dev",    name: "Development",  url: 'mongodb://peg-ctmcmndb02:27017/'},
  { id: "prod",   name: "Production",   url: 'mongodb://peg-ctmmongdb02:27017/'},
];

var app = express();

app.use(express.static(__dirname + '/content'));

app.get('/known-stores', function (req, res){
  res.send(_.map(knownEventStores, function(item) { return _.omit(item,'db')}));
});

app.get('/environments', function (req, res){
  res.send(_.map(environments, function(item) { return _.omit(item, 'url')}));
});

app.get('/events', function(req, res) {
  var aggregateId = guid.toMongoBinary(req.query.id);

  var environment = _.find(environments, {id : req.query.env});

  if (!environment) {
    res.status(400).send('Unknown environment');
    return;
  }

  var eventStore = _.find(knownEventStores, {id : req.query.store});

  if (!eventStore) {
    res.status(400).send('Unknown event store');
    return;
  }

  repository.getEvents(environment.url + eventStore.db, aggregateId, function(events) {
    if (!events.length) {
      res.send(404);
      return;
    }
    console.log(guid.fromBinary(events[0].Events[0].Payload.Body._id));
    res.json(_.flatten(events,'Events'));
  });

});

var port = 8028;

app.listen(port, function() {
  console.log("Server started.");
});

console.log("Event Show is about to listen on port: " + port);