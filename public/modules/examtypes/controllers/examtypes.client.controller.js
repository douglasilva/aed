'use strict';

// Examtypes controller
angular.module('examtypes').controller('ExamtypesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Examtypes',
	function($scope, $stateParams, $location, Authentication, Examtypes) {
		$scope.authentication = Authentication;

		// Create new Examtype
		$scope.create = function() {
			// Create new Examtype object
			var examtype = new Examtypes ({
				name: this.name
			});

			// Redirect after save
			examtype.$save(function(response) {
				$location.path('examtypes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Examtype
		$scope.remove = function(examtype) {
			if ( examtype ) { 
				examtype.$remove();

				for (var i in $scope.examtypes) {
					if ($scope.examtypes [i] === examtype) {
						$scope.examtypes.splice(i, 1);
					}
				}
			} else {
				$scope.examtype.$remove(function() {
					$location.path('examtypes');
				});
			}
		};

		// Update existing Examtype
		$scope.update = function() {
			var examtype = $scope.examtype;

			examtype.$update(function() {
				$location.path('examtypes/' + examtype._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Examtypes
		$scope.find = function() {
			$scope.examtypes = Examtypes.query();
		};

		// Find existing Examtype
		$scope.findOne = function() {
			$scope.examtype = Examtypes.get({ 
				examtypeId: $stateParams.examtypeId
			});
		};
	}
]);