'use strict';

// Configuring the Articles module
angular.module('impexcels').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Importar exames', 'impexcels', 'item', 'impexcels');
	}
]);
