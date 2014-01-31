var express = require('express');

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

app.get('/events', function( req, res) {
  console.log(req.query);
});

var port = 8028;
app.listen(port);
console.log("Event Show is listening on port: " + port);