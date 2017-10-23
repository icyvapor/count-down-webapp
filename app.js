var departuresApp = angular.module('departuresApp', ['ngRoute']);

departuresApp
    .config(function($routeProvider){
	    $routeProvider
		    .when('/',
		    {
		    	controller: 'DeparturesController',
			    templateUrl: 'board.html'
		    })
		    .otherwise({redirectTo: '/'});
	})
	.controller('DeparturesController', function($scope, $http, $timeout, $routeParams) {

		//=========== Game Configuration  ========
		
		// ----DELAY TIME (mins) ---------------
		$scope.delayTime = 1;
		// ----PASS CODE ----------------------
		$scope.secret = "deepblue";
				

		// internal varaibles
		$scope.done = false;
		$scope.delayTimeSecs = $scope.delayTime * 60;

		$scope.diffuse = function() {
			if ($scope.passcode == $scope.secret)
			{
				$scope.done = true;				
				$scope.successMsg = "The world is saved! Well done!";
			}
		};


        $scope.tick = function() {
            function checkTime(i) {
                if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
                return i;
            }

			var h = 0, m = 0, s = 0;
			var totalSecs = $scope.delayTimeSecs;

			if ( totalSecs >= 0) 
			{
            	h = Math.floor(totalSecs/3600);
				var rMins = totalSecs % 3600;
            	m = Math.floor(rMins/60) ;	
		 		s = rMins % 60;
			}
			else 
			{
				$scope.failureMsg = "KABOOOOOOM!!!";
				return;
			}

            m = checkTime(m);
            s = checkTime(s);

            $scope.clock = h + ":" + m + ":" + s;

			$scope.delayTimeSecs -= 1;

            $timeout(function(){
				if (! $scope.done)
				{                 
					$scope.tick();
				}
            }, 1000)
        }

        $scope.tick();


    });
