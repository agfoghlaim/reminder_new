
app.controller('majorTom', function($scope, ReminderService,getService, updateService){

$scope.$on("$ionicView.beforeEnter", function(){
   //check if there's a reminder or not
	   $scope.theBlob = JSON.parse(localStorage.getItem("blobID"));
		//if reminder already stored get it from service
		if($scope.theBlob){
			$scope.exists = true;
	   		getService.getReminder(reminder, noReminder, $scope.theBlob);
		}
		// else set reminder to blank
		else{
			$scope.exists = false;
			$scope.reminder = {
			title: '',
			description: '',
			priority: '',
			complete: false
			}
		}

	  //deal with response from getReminder
		function reminder(response){
	  	//set reminder equal to data from jsonblob
	  		$scope.reminder = {
	  			title: response.data.title,
	  			description: response.data.description,
	  			priority: response.data.priority,
	  			complete: response.data.complete
	  		}
	  	}

	  	function noReminder(status, statusText){
	  	console.log(status + " " + statusText);
	  	}

	//get reminder priority info
	$scope.getPriority = function(prior){
		$scope.reminder.priority = prior;
	}  	

});

	//make Reminder - POST

	$scope.makeReminder = function(){
		ReminderService.makeReminder(responseGood, responseBad, $scope.reminder)
	};

		//deal with makeReminder response, set in local storage
		function responseGood(response){
			$scope.exists = true;
			$scope.theBlob = response.data.uri;
			console.log("URL = " + $scope.theBlob);
			localStorage.setItem("blobID", JSON.stringify($scope.theBlob));
		}

		function responseBad(status, statusText){
			alert("Something's wrong: " + status + " " + statusText);
		}

	//update reminder - PUT

	$scope.updateReminder = function(){
		updateService.updateReminder(rGood, rBad, $scope.theBlob, $scope.reminder);
	}

		//if the reminder is successfully updated, get the new info to update app
		function rGood(response){
			$scope.reminder = {
  			title: response.title,
  			description: response.description,
  			priority: response.priority,
  			complete: response.complete
  			}
		}

		function rBad(status, statusText){
			console.log(status + statusText);
		}


//delete reminder
$scope.deleteReminder = function(){
	$scope.exists = false;
 	localStorage.clear();
 	$scope.reminder = {
		title: '',
		description: '',
		priority: '',
		complete: false
	}

}
	

});
















