'use strict';

// Configuring the Articles module
angular.module('exams').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Exames', 'exams', 'dropdown', '/exams(/create)?');
		Menus.addSubMenuItem('topbar', 'exams', 'Lista de exames', 'exams');
		Menus.addSubMenuItem('topbar', 'exams', 'Novo exame', 'exams/create');
	}
]);
