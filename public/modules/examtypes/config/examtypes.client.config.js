'use strict';

// Configuring the Exam Type module
angular.module('examtypes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		//Menus.addMenuItem('topbar', 'Examtypes', 'examtypes', 'dropdown', '/examtypes(/create)?');
		Menus.addSubMenuItem('topbar', 'exams', 'Lista de Tipos de Exame', 'examtypes');
		Menus.addSubMenuItem('topbar', 'exams', 'Novo Tipo de Exame', 'examtypes/create');
	}
]);
