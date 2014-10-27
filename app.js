
(function() {
	var app = angular.module('weatherWidget', []);
	app.controller('ForecastController', function($scope, $http) {
		var s_url = "http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%2222102%22&format=json";
		app.config(['$httpProvider', function($httpProvider) {
			//initialize get if not there
			if (!$httpProvider.defaults.headers.get) {
				$httpProvider.defaults.headers.get = {};
			}
			//disable IE ajax request caching
			$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
		}]);
		delete $http.defaults.headers.common['X-Requested-With'];
		$http({
				method: 'GET',
				url: s_url
			})
			.success(function(data, status, headers, config) {
				if (data) {
					item2 = data.query.results.channel.item;
				} else {

				}
				condition = item2.condition;
				description = item2.description;
				$scope.title = ((item2.title.split(" at "))[0]).split(" for ")[1];

				$scope.currentTemp = condition.temp;
				$scope.visual = condition.text;

				start = description.indexOf("img src=\\");
				end = description.indexOf("gif");
				$scope.image_url = (description.substring(start + 12, end + 3)).trim();
				$scope.forecast = item2.forecast;
				$scope.days = forecast.length;
			})
			.error(function(data, status, headers, config) {
				alert("Oops, Cannot connect to the server");
				// if (window.XDomainRequest) {
// 					var xdr = new XDomainRequest();
// 					var the_data = null;
// 					if (xdr) {
// 						xdr.onload = function() {
// 							element.innerHTML = xdr.responseText;
// 						}
// 						xdr.open("get", s_url, true);
// 						xdr.send(null);
// 						the_data = JSON.parse(xdr.responseText);
// 						//alert(JSON.stringify(data));
// 						alert(1);
// 					}
// 				} else {
// 					var xmlhttp = null;
// 					xmlHttp = new XMLHttpRequest();
// 					xmlHttp.open("GET", s_url, false);
// 					xmlHttp.send(null);
// 					the_data = JSON.parse(xmlHttp.responseText);
// 					alert(2);
// 				}
// 				item2 = the_data.query.results.channel.item;
			});

	});

})();