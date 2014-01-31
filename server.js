var express = require('express');

var app = express();

app.use(express.static(__dirname + '/content'));

var port = 8028;
app.listen(port);
console.log("Event Show is listening on port: " + port);