var EventShowModel = function() {
  var self = this;
  self.knownEventStores = ko.observableArray([]);
  self.environments = ko.observableArray([]);
  self.aggregateId = ko.observable();
  self.selectedEventStore = ko.observable();
  self.selectedEnvironment = ko.observable();
  self.events = ko.observableArray([]);

  this.loadEventStores = function() {
    $.get("/known-stores")
        .done(function(data) {
          self.knownEventStores(data);
        });
  };

  this.loadEnvironments = function() {
    $.get("/environments")
        .done(function(data) {
          self.environments(data);
        });
  };

  this.populateDropDowns = function() {
    self.loadEventStores();
    self.loadEnvironments();
  };

  this.loadEvents = function() {
    if (!self.aggregateId() || !self.selectedEventStore() || !self.selectedEnvironment()) {
      alert("Please fill the form in");
      return;
    }

    var requestData = {
      env: self.selectedEnvironment().id,
      store: self.selectedEventStore(),
      id: self.aggregateId()
    };

    $.getJSON("/events", requestData)
        .done(function(data) {
          self.events(data);
        })
        .fail(function( jqxhr, textStatus, error) {
          console.log("Request failed: " + textStatus + " error:" + error);
          alert("Sorry there is a problem with your request");
        })
  }
};

$(function() {
  var model = new EventShowModel();
  ko.applyBindings(model);
  model.populateDropDowns();
});