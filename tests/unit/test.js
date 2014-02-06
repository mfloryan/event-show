describe("A simple test example",function(){
  var $rootScope, $controller,childScope, createController;

  beforeEach(module('eventViewer'));

  beforeEach(inject(function(_$rootScope_, _$controller_){
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    childScope = $rootScope.$new();
    createController = function(){
      return $controller('myController',{$scope: childScope});
    }
  }));

  it('When a controller get initialized should make a call to the server to get data',function(){
    createController();
    var event = {Payload: {Body : {
      "_t": "RiskCreated",
      "VisitCreatedId": "0dd99292-da19-42e1-ab08-1a5331242c9e",
      "CreatedAt": "2014-02-03T16:04:13.604Z",
      "CoverType": "NotSet",
      "Version" :1,
      "_id" : "123"
    }}};
    var result = childScope.model.formatEvent(event);
    expect(result).toBe('{\n\
  "VisitCreatedId": "0dd99292-da19-42e1-ab08-1a5331242c9e",\n\
  "CreatedAt": "2014-02-03T16:04:13.604Z",\n\
  "CoverType": "NotSet"\n\
}');
  });
});
