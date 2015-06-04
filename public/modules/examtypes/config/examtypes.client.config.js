'use strict';

// Configuring the Exam Type module
angular.module('examtypes').run(['Menus',
	function(Menus) {
		Menus.addSubMenuItem('topbar', 'exams', 'Tipos de Exame', 'examtypes');
	}
]);
