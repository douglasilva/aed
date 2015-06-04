'use strict';

angular.module('exams').directive('formatdate', [
	function($filter) {
		return {
			link: function (scope, element, attrs, ctrl) {
				console.log("Douglas");
				ctrl.$formatters.unshift(function (modelValue) {
					return $filter('date')(modelValue);
				});

				ctrl.$parsers.unshift(function (viewValue) {
					return $filter('date')(modelValue);
				});
			},
			restrict: 'A',
			require: 'ngModel'
		}
	}
]);
