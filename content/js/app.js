angular.module('eventViewer',[])

  .controller('myController',function($scope,$http,eventHttpService){
      eventHttpService.getEnv().success(function(data) { $scope.environments = data});
      eventHttpService.getKnownStores().success(function(data) { $scope.knownStores = data });

    $scope.model = {selectedEnv:''};

    $scope.showEvents = function ()
    {
      var parms = {
        'env': $scope.model.selectedEnv,
        'store': $scope.selectedStore.id,
        'id': $scope.aggregateId
      };

      eventHttpService.getEvents(parms)
          .success(function(data){
            $scope.events = data;
          })
          .error(function(data, status){
            $scope.events = null;
          });
    };

    $scope.model.formatEvent = function(event) {
      return JSON.stringify(_.omit(event.Payload.Body, ['_id','_Metadata', '_t', 'Version']), null, '  ');
    }
  })
  .service('eventHttpService',function($http){
      return{
        getEnv: function(){
           return $http.get('/environments');
        },
        getKnownStores: function(){
          return $http.get('/known-stores');
        },
        getEvents: function(parms)
        {
          return $http.get('/events',{'params':parms});
        }
      }
    });