
app.controller('HomeController', ['$scope', '$state','$ionicPlatform','$ionicActionSheet','$ionicModal','$cordovaToast','$firebase','ngToast', HomeController]);
	
	
	function HomeController($scope, $state,$ionicPlatform,$ionicActionSheet,$ionicModal,$cordovaToast,$firebase,ngToast){

        $scope.monthviewEventDetailTemplateUrl = 'templates/calendar/monthViewEventDetail.html';

	$scope.dayviewAllDayEventTemplateUrl='templates/calendar/displayEvent.html';
	$scope.weekviewAllDayEventTemplateUrl='templates/calendar/displayWeekEvent.html';

			  $ionicModal.fromTemplateUrl('templates/add.html', {
			    scope: $scope
			  }).then(function(modal) {
			    $scope.modal = modal;
			  });
			  


			$scope.eventobj={

				title:"",
				startTime:"",
				endTime:""
			}
			 $scope.calendar = {};
			     
  var ref = new Firebase("https://appointment-schedule-27532.firebaseio.com/events");
  var sync = $firebase(ref);

  $scope.calendar.eventSource = sync.$asArray();


$scope.calendar.eventSource.$watch(function(a) {

	console.log("broacaasst");

	a.startTime=new Date(a.startTime);
	a.endTime= new Date(a.endTime);
	$scope.$broadcast("eventSourceChanged",$scope.calendar.eventSource);

});

$scope.$broadcast("eventSourceChanged",$scope.calendar.eventSource);


	        $scope.changeMode = function (mode) {
	            $scope.calendar.mode = mode;
	        };

	        $scope.loadEvents = function () {
	            $scope.calendar.eventSource = createRandomEvents();
	        };

	        $scope.onEventSelected = function (event) {
	            console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
	        };

	        $scope.onViewTitleChanged = function (title) {
	            $scope.viewTitle = title;
	        };

	        $scope.today = function () {
	            $scope.calendar.currentDate = new Date();
	        };

	        $scope.isToday = function () {
	            var today = new Date(),
	                currentCalendarDate = new Date($scope.calendar.currentDate);

	            today.setHours(0, 0, 0, 0);
	            currentCalendarDate.setHours(0, 0, 0, 0);
	            return today.getTime() === currentCalendarDate.getTime();
	        };

	        $scope.onTimeSelected = function (selectedTime, events, disabled) {
	            console.log('Selected time: ' + selectedTime + ', hasEvents: ' + (events !== undefined && events.length !== 0) + ', disabled: ' + disabled);

	            /*if(!(events !== undefined && events.length !== 0)){
		             var hideSheet = $ionicActionSheet.show({
					     buttons: [
					       { text: '<b>Share</b> This' },
					       { text: selectedTime }
					     ],
					     destructiveText: 'Delete',
					     titleText: 'Create Event',
					     cancelText: 'Cancel',
					     cancel: function() {
					          // add cancel code..
					        },
					     buttonClicked: function(index) {
					       return true;
					     },
					     destructiveButtonClicked :function(){

					     	alert("gf");
					     }
				   });
	          }   
*/

	        };


	     $scope.addEvents=function(obj){

	     			$scope.modal.hide();

	    			$scope.calendar.eventSource.$add({

			        		 		title: obj.title,
			                        startTime: obj.startTime.getTime(),
			                        endTime: obj.endTime.getTime(),
			                        allDay: false

			        	}) 

	    	

	    			     	$scope.$broadcast("eventSourceChanged",$scope.calendar.eventSource);
			
	    			     

					 $cordovaToast
						.show('Event Added', 'short', 'center')
						.then(function(success) {
						  // success
						}, function (error) {
						  // error
						});
							

/*
					var date = new Date();
			        var startMinute = Math.floor(Math.random() * 24 * 60);
			        var endMinute = Math.floor(Math.random() * 180) + startMinute;
			        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() , 0, date.getMinutes() + startMinute);
			        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() , 0, date.getMinutes() + endMinute);

					console.log($scope.calendar.eventSource.length);

			        	console.log($scope.calendar.eventSource);
			        	console.log($scope.calendar.eventSource.length);
*/


	        }

	        function createRandomEvents() {
	            var events = [];
	            for (	var i = 0; i < 50; i += 1) {
	                var date = new Date();
	                var eventType = Math.floor(Math.random() * 2);
	                var startDay = Math.floor(Math.random() * 90) - 45;
	                var endDay = Math.floor(Math.random() * 2) + startDay;
	                var startTime;
	                var endTime;
	                if (eventType === 0) {
	                    startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
	                    if (endDay === startDay) {
	                        endDay += 1;
	                    }
	                    endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
	                    events.push({
	                        title: 'All Day - ' + i,
	                        startTime: startTime,
	                        endTime: endTime,
	                        allDay: true
	                    });
	                } else {
	                    var startMinute = Math.floor(Math.random() * 24 * 60);
	                    var endMinute = Math.floor(Math.random() * 180) + startMinute;
	                    startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
	                    endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
	                    events.push({
	                        title: 'Event - ' + i,
	                        startTime: startTime,
	                        endTime: endTime,
	                        allDay: false
	                    });
	                }
	            }
	            return events;
	        }

				$scope.delete=function(obj){

				console.log(obj);

				ref.child(obj.$id).remove(function(error){
					    if (error) {
					    console.log("Error:", error);
					  } else {
					    console.log("Removed successfully!");

					 $cordovaToast
						.show('Event Removed', 'short', 'center')
						.then(function(success) {
						  // success
						}, function (error) {
						  // error
						});
					    $scope.$broadcast("eventSourceChanged",$scope.calendar.eventSource);
					  }

							//$scope.calendar.eventSource.$remove(obj);
				  })   	


				}


				


	}

