# Ionic-Event-Scheduler


This is a event scheduler application using IONIC

Bower Install: bower install ionic-calendar

Load the necessary dependent files:

<link rel="stylesheet" href="http://code.ionicframework.com/1.1.1/css/ionic.min.css"/>
<link rel="stylesheet" href="<bower lib installation path>/ionic-calendar/dist/css/calendar.min.css"/>
<script src="http://code.ionicframework.com/1.1.1/js/ionic.bundle.min.js"></script>
<script src="<bower lib installation path>/ionic-calendar/dist/js/calendar-tpls.min.js"></script>


Add the calendar module as a dependency to your application module:

var myAppModule = angular.module('MyApp', ['ui.rCalendar'])


Add the directive in the html page

<calendar calendar-mode="mode" event-source="eventSource">


When you manually modify the element in the eventSource array.
Parameter: value
The whole event source object
$scope.$broadcast('eventSourceChanged',$scope.eventSource);
