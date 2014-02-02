var express = require('express');
var _ = require('lodash');
var mongodb = require('mongodb');
var guid = require('./lib/guid-translation');

var knownEventStores = [
  { id: "risk",
    name: "Home - Risk" },
  { id: "enquiry",
    name : "Panel - Enquiry"},
];

var environments = [
  { id: "local", name: "Local"},
  { id: "dev", name: "Development"},
];

var app = express();

app.use(express.static(__dirname + '/content'));

app.get('/known-stores', function (req, res){
  res.send(knownEventStores);
});

app.get('/environments', function (req, res){
  res.send(environments);
});

app.get('/events', function(req, res) {
  var aggregateId = guid.toMongoBinary(req.query.id);

  mongodb.MongoClient.connect("mongodb://localhost:27017/eventstore_home_risk", function (err, db) {
    if (err) throw err;
    var collection = db.collection("Commits");
    collection.find({ '_id.StreamId' : aggregateId }, {'Events':1}).toArray(function(err,results) {
      if (err) throw err;
      console.log(guid.fromBinary(results[0].Events[0].Payload.Body._id));
      res.json(_.flatten(results,'Events'));
      db.close();
    });
  });
});

var port = 8028;
app.listen(port);
console.log("Event Show is listening on port: " + port);