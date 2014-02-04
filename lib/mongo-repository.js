(function() {
  "use strict";

  var mongodb = require('mongodb');

  exports.getEvents = function(databaseUrl, aggregateId, resultsCallback) {

      mongodb.MongoClient.connect(databaseUrl, function (err, db) {
        if (err) throw err;
        var collection = db.collection("Commits");
        collection.find({ '_id.StreamId' : aggregateId }, {'Events':1})
                  .toArray(function(err,results) {
          if (err) throw err;
          resultsCallback(results);
          db.close();
        });
      });
  };

}());