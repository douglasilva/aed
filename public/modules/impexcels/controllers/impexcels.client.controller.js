'use strict';

// Impexcels controller
angular.module('impexcels').controller('ImpexcelsController',
  ['$scope', 'FileUploader', '$stateParams', '$location', 'Authentication', 'Impexcels',
    function ($scope, FileUploader, $stateParams, $location, Authentication, Impexcels) {
      $scope.authentication = Authentication;

      $scope.onUpload =function(o) {
        console.log('onUpload =', o);
      }

        
    }]);
