'use strict';

//Examtypes service used to communicate Examtypes REST endpoints
angular.module('examtypes').factory('Examtypes', ['$resource',
	function($resource) {
		return $resource('examtypes/:examtypeId', { examtypeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);