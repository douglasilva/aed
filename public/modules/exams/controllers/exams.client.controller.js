'use strict';

// Exams controller
angular.module('exams').controller('ExamsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Exams', 'foo',
	function($scope, $stateParams, $location, Authentication, Exams, foo) {

		$scope.authentication = Authentication;

		$scope.example = {
			value: new Date(2013, 9, 22)
		};

		// Create new Exam
		$scope.create = function() {
			// Create new Exam object
			var exam = new Exams ({
				name: this.name,
				age: this.age,
				date: this.date,
				doctorName: this.doctorName,
				reason: this.reason,
				healthPlan: this.healthPlan,
				report: this.report,
				examType: this.examType,
				status: this.status
			});

			// Redirect after save
			exam.$save(function(response) {
				$location.path('exams/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Exam
		$scope.remove = function(exam) {
			if ( exam ) { 
				exam.$remove();

				for (var i in $scope.exams) {
					if ($scope.exams [i] === exam) {
						$scope.exams.splice(i, 1);
					}
				}
			} else {
				$scope.exam.$remove(function() {
					$location.path('exams');
				});
			}
		};

		// Update existing Exam
		$scope.update = function() {
			var exam = $scope.exam;

			exam.$update(function() {
				$location.path('exams/' + exam._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Exams
		$scope.find = function() {
			$scope.exams = Exams.query();
		};

		// Find existing Exam
		$scope.findOne = function() {
			$scope.exam = Exams.get({ 
				examId: $stateParams.examId
			});
		};

		$scope.createInit = function() {
			foo.getExamTypes()
				.success(function (types) {
					$scope.examtypes = types;
				})
				.error(function (error) {
					$scope.status = 'Unable to load customer data: ' + error.message;
				});
		};

		$scope.update = function() {
			console.log($scope.examType);
			// use $scope.selectedItem.code and $scope.selectedItem.name here
			// for other stuff ...
		}
	}
]);
