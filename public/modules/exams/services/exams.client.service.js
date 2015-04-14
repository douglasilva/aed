'use strict';

//Exams service used to communicate Exams REST endpoints
angular.module('exams').factory('Exams', ['$resource',
	function($resource) {
		return $resource('exams/:examId', { examId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]).factory('foo', function($http) {

	var foo = {};

	foo.getExamTypes = function() {
		return $http.get('/examtypes')
			.success(function (d) {
				return d;
			});
	};

	return foo;
});
