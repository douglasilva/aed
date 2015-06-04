'use strict';

// Configuring the Exam module
angular.module('exams').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cadastros', 'exams', 'dropdown', 'exams');
		Menus.addSubMenuItem('topbar', 'exams', 'Exames', 'exams');
	}
]);
