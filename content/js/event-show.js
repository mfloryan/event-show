var EventShowModel = function() {
  var self = this;
  self.knownEventStores = ko.observableArray([]);
  self.aggregateId = ko.observable();
  self.selectedEventStore = ko.observable();

  this.loadEventStores = function() {
    $.get("/known-stores")
        .done(function(data) {
          self.knownEventStores(data);
        });
  };

  this.loadEvents = function() {
    if (!self.aggregateId() || !self.selectedEventStore()) {
      alert("Please fill the form in");
      return;
    }
    
  }
};



$(function() {
  var model = new EventShowModel();
  ko.applyBindings(model);
  model.loadEventStores();
});