describe('ChatsCtrl', function() {
  var scope;

  beforeEach(angular.mock.module('starter.controllers'));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('ChatsCtrl', {$scope: scope});
  }));

  it("Checks Username", function () {
    var k = "Rakan";
    expect(scope.testLogin(k)).toEqual("Rakan");
  });
});
