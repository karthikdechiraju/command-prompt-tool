var cmd = angular.module('cmd',['ngRoute'])

cmd.config(function($httpProvider,$routeProvider,$locationProvider){
	$locationProvider.hashPrefix('');
	$routeProvider.
	when('/cmd',{
		templateUrl:'templates/main.html',
		controller:'cmdCtrl'
	}).
	otherwise({
		redirectTo:'/cmd'
	})

	$httpProvider.interceptors.push(function() {
		return {
		  'request': function(config) {
		    var formHeader = config.headers;
		    // formHeader['Access-Control-Allow-Origin'] = '*'
		    return config;
		  }
		};
	});


})

cmd.controller('cmdCtrl',function($scope,$http,$sce){
	
	$scope.prompt_array = [];

	$scope.focus = function() {
      document.getElementById('input2').focus();
    }; 

    $scope.trustAsHtml = function(string) {
        return $sce.trustAsHtml(string);
    };

})