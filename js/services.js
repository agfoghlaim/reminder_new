app.service('ReminderService', function($http){
	this.makeReminder = function(callGood, callBad, reminder){
		var url = 'https://api.myjson.com/bins';
		$http.post(url, reminder).then(funGood, funBad);
		function funGood(response){
			callGood(response);
		};
						
		function funBad(response){
			callBad(response.status, response.statusText);
			
		}
	}
});

app.service('getService', function($http){
	this.getReminder = function(callGood, callBad, url){
		
		
		$http.get(url).then(funGood, funBad);
		function funGood(response){
			callGood(response);
			

		}
		function funBad(response){
			callBad(response.status, response.statusText);
		}
	}
});


app.service('updateService', function($http){
	this.updateReminder = function(callGood, callBad, blob, reminder){
		
		
		$http.put(blob, reminder).then(funGood, funBad);
		function funGood(response){
			callGood(response.data);
			
			
		}
		function funBad(response){
			callBad(response.status, response.statusText);
		
		}
	}

});




