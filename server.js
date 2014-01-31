var express = require('express');

var knownEventStores = [
  { id: "risk",
    name: "Home - Risk" },
  { id: "enquiry",
    name : "Panel - Enquiry"}
];

var app = express();

app.use(express.static(__dirname + '/content'));

app.get('/known-stores', function (req, res){
  res.send(knownEventStores);
});

var port = 8028;
app.listen(port);
console.log("Event Show is listening on port: " + port);