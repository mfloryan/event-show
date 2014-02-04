(function() {
  "use strict";

  var server = require('./server');

  var port = 8028;

  server.start(port, function() {
      console.log("Server started.");
  });

  console.log("Event Show is about to listen on port: " + port);

}());