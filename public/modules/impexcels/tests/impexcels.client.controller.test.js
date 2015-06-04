'use strict';

(function() {
	// Impexcels Controller Spec
	describe('Impexcels Controller Tests', function() {
		// Initialize global variables
		var ImpexcelsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Impexcels controller.
			ImpexcelsController = $controller('ImpexcelsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Impexcel object fetched from XHR', inject(function(Impexcels) {
			// Create sample Impexcel using the Impexcels service
			var sampleImpexcel = new Impexcels({
				name: 'New Impexcel'
			});

			// Create a sample Impexcels array that includes the new Impexcel
			var sampleImpexcels = [sampleImpexcel];

			// Set GET response
			$httpBackend.expectGET('impexcels').respond(sampleImpexcels);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.impexcels).toEqualData(sampleImpexcels);
		}));

		it('$scope.findOne() should create an array with one Impexcel object fetched from XHR using a impexcelId URL parameter', inject(function(Impexcels) {
			// Define a sample Impexcel object
			var sampleImpexcel = new Impexcels({
				name: 'New Impexcel'
			});

			// Set the URL parameter
			$stateParams.impexcelId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/impexcels\/([0-9a-fA-F]{24})$/).respond(sampleImpexcel);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.impexcel).toEqualData(sampleImpexcel);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Impexcels) {
			// Create a sample Impexcel object
			var sampleImpexcelPostData = new Impexcels({
				name: 'New Impexcel'
			});

			// Create a sample Impexcel response
			var sampleImpexcelResponse = new Impexcels({
				_id: '525cf20451979dea2c000001',
				name: 'New Impexcel'
			});

			// Fixture mock form input values
			scope.name = 'New Impexcel';

			// Set POST response
			$httpBackend.expectPOST('impexcels', sampleImpexcelPostData).respond(sampleImpexcelResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Impexcel was created
			expect($location.path()).toBe('/impexcels/' + sampleImpexcelResponse._id);
		}));

		it('$scope.update() should update a valid Impexcel', inject(function(Impexcels) {
			// Define a sample Impexcel put data
			var sampleImpexcelPutData = new Impexcels({
				_id: '525cf20451979dea2c000001',
				name: 'New Impexcel'
			});

			// Mock Impexcel in scope
			scope.impexcel = sampleImpexcelPutData;

			// Set PUT response
			$httpBackend.expectPUT(/impexcels\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/impexcels/' + sampleImpexcelPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid impexcelId and remove the Impexcel from the scope', inject(function(Impexcels) {
			// Create new Impexcel object
			var sampleImpexcel = new Impexcels({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Impexcels array and include the Impexcel
			scope.impexcels = [sampleImpexcel];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/impexcels\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleImpexcel);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.impexcels.length).toBe(0);
		}));
	});
}());