'use strict';

//Impexcels service used to communicate Impexcels REST endpoints
angular.module('impexcels').factory('Impexcels', ['$resource',
	function($resource) {
		return $resource('impexcels/:impexcelId', { impexcelId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);