'use strict';

//Setting up route
angular.module('impexcels').config(['$stateProvider',
	function($stateProvider) {
		// Impexcels state routing
		$stateProvider.
		state('listImpexcels', {
			url: '/impexcels',
			templateUrl: 'modules/impexcels/views/list-impexcels.client.view.html'
		}).
		state('createImpexcel', {
			url: '/impexcels/create',
			templateUrl: 'modules/impexcels/views/create-impexcel.client.view.html'
		}).
		state('viewImpexcel', {
			url: '/impexcels/:impexcelId',
			templateUrl: 'modules/impexcels/views/view-impexcel.client.view.html'
		}).
		state('editImpexcel', {
			url: '/impexcels/:impexcelId/edit',
			templateUrl: 'modules/impexcels/views/edit-impexcel.client.view.html'
		});
	}
]);