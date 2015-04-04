'use strict';

//Setting up route
angular.module('examtypes').config(['$stateProvider',
	function($stateProvider) {
		// Examtypes state routing
		$stateProvider.
		state('listExamtypes', {
			url: '/examtypes',
			templateUrl: 'modules/examtypes/views/list-examtypes.client.view.html'
		}).
		state('createExamtype', {
			url: '/examtypes/create',
			templateUrl: 'modules/examtypes/views/create-examtype.client.view.html'
		}).
		state('viewExamtype', {
			url: '/examtypes/:examtypeId',
			templateUrl: 'modules/examtypes/views/view-examtype.client.view.html'
		}).
		state('editExamtype', {
			url: '/examtypes/:examtypeId/edit',
			templateUrl: 'modules/examtypes/views/edit-examtype.client.view.html'
		});
	}
]);