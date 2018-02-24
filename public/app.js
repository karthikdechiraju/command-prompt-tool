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

    $scope.cmd_submit = function(){
		var cmd_array = $scope.cmd_input.split(' ');
		switch(cmd_array[0].trim()){
			case 'def':
				$scope.definition(cmd_array[1].trim(),'new')
				break;

			case 'syn':
					$scope.synonym(cmd_array[1].trim(),'new')
					break;

			case 'ant':
				$scope.antonym(cmd_array[1].trim(),'new')
				break;

			case 'ex':
					$scope.example(cmd_array[1].trim(),'new')
					break;

			case 'cls':
				$scope.clearArray();
				break;

			default:
				if (cmd_array[1]) {
					var li = '<div>Enter command: ./dict '+ cmd_array[0].trim() +' '+ cmd_array[1].trim() +'</div>';
				}else{
					var li = '<div>Enter command: ./dict '+ cmd_array[0].trim() +'</div>';
				}
				li = li + '<div>'+ cmd_array[0].trim() +' is not defined</div>'
				$scope.prompt_array.push(li)
				$scope.cmd_input = ""
		}
	}

	$scope.definition = function(text,command){
    	$http.get('http://api.wordnik.com/v4/word.json/'+text+'/definitions?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
			.then(function(response){
				if (response.data.length) {
					if (command && command == 'new') {
						var li = '<div class="repeat-div-heading">Enter command: ./dict def '+ text+'</div>';
					}else{
						var li = '<div class="repeat-div-heading">Definition of '+ text+'</div>';
					}
					for (var i = 0; i < response.data.length; i++) {
						li = li + '<div>'+ '<b> '+ parseInt(i + 1) +'. </b>'  + response.data[i].text +'</div>'
					}
				}else{
					var li = '<div class="repeat-div-heading">Enter command: ./dict def '+ text+'</div>';
					li = li + '<div>No definition found</div>'
				}
				$scope.prompt_array.push(li)
				$scope.cmd_input = ""
			})
			.catch(function(err){
				var li = '<div class="repeat-div-heading">Enter command: ./dict def '+ text+'</div>';
				li = li + '<div>No definition found</div>'
				$scope.prompt_array.push(li)
				$scope.cmd_input = ""
			})
    }

    $scope.synonym = function(text,command){
    	$http.get('http://api.wordnik.com:80/v4/word.json/'+ text +'/relatedWords?&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5&relationshipTypes=synonym')
			.then(function(response){
				if (response.data.length) {
					for (var i = 0; i < response.data.length; i++) {
						if (response.data[i].relationshipType == "synonym") {
							var syn_array = response.data[i].words;
						}
					}
					if (syn_array) {
						if (command && command == 'new') {
							var li = '<div class="repeat-div-heading">Enter command: ./dict syn '+ text+'</div>';
						}else{
							var li = '<div class="repeat-div-heading">Synonyms of '+ text+'</div>';
						}
						for (var i = 0; i < syn_array.length; i++) {
							li = li + '<div>'+ '<b> '+ parseInt(i + 1) +'. </b>'  + syn_array[i] +'</div>'
						}
					}else{
						var li = '<div class="repeat-div-heading">Enter command: ./dict syn '+ text+'</div>';
						li = li + '<div>No synonym found</div>'
					}
				}else{
					var li = '<div class="repeat-div-heading">Enter command: ./dict syn '+ text+'</div>';
					li = li + '<div>No synonym found</div>'
				}
				$scope.prompt_array.push(li)
				$scope.cmd_input = ""
			})
			.catch(function(err){
				console.log(err)
				var li = '<div class="repeat-div-heading">Enter command: ./dict syn '+ text+'</div>';
				li = li + '<div>No synonym foundzdfsdf</div>'
				$scope.prompt_array.push(li)
				$scope.cmd_input = ""
			})
    }

    $scope.antonym = function(text,command){
    	$http.get('http://api.wordnik.com:80/v4/word.json/'+ text +'/relatedWords?&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5&relationshipTypes=antonym')
			.then(function(response){
				if (response.data.length) {
					for (var i = 0; i < response.data.length; i++) {
						if (response.data[i].relationshipType == "antonym") {
							var ant_array = response.data[i].words;
						}
					}
					if (ant_array) {
						if (command && command == 'new') {
							var li = '<div class="repeat-div-heading">Enter command: ./dict ant '+ text+'</div>';
						}else{
							var li = '<div class="repeat-div-heading">Antonyms of '+ text+'</div>';
						}
						for (var i = 0; i < ant_array.length; i++) {
							li = li + '<div>'+ '<b> '+ parseInt(i + 1) +'. </b>'  + ant_array[i] +'</div>'
						}
					}else{
						var li = '<div class="repeat-div-heading">Enter command: ./dict ant '+ text+'</div>';
						li = li + '<div>No antonym found</div>'
					}
				}else{
					var li = '<div class="repeat-div-heading">Enter command: ./dict ant '+ text+'</div>';
					li = li + '<div>No antonym found</div>'
				}
				$scope.prompt_array.push(li)
				$scope.cmd_input = ""
			})
			.catch(function(err){
				var li = '<div class="repeat-div-heading">Enter command: ./dict ant '+ text+'</div>';
				li = li + '<div>No antonym found</div>'
				$scope.prompt_array.push(li)
				$scope.cmd_input = ""
			})
    }

    $scope.clearArray = function(){
    	$scope.prompt_array = [];
    	$scope.cmd_input = ""
    }

    $scope.example = function(text,command){
    	$http.get('http://api.wordnik.com:80/v4/word.json/'+ text +'/topExample?useCanonical=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
			.then(function(response){
				if (response.data.text) {
					if (command && command == 'new') {
						var li = '<div class="repeat-div-heading">Enter command: ./dict ex '+ text+'</div>';
					}else{
						var li = '<div class="repeat-div-heading">Examples of '+ text+'</div>';
					}
					li = li + '<div>'+ response.data.text +'</div>'
				}else{
					var li = '<div class="repeat-div-heading">Enter command: ./dict ex '+ text+'</div>';
					li = li + '<div>No examples found</div>'
				}
				$scope.prompt_array.push(li)
				$scope.cmd_input = ""
			})
			.catch(function(err){
				var li = '<div class="repeat-div-heading">Enter command: ./dict ex '+ text+'</div>';
				li = li + '<div>No examples found</div>'
				$scope.prompt_array.push(li)
				$scope.cmd_input = ""
			})
    }

})