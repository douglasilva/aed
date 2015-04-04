'use strict';

(function() {
	// Examtypes Controller Spec
	describe('Examtypes Controller Tests', function() {
		// Initialize global variables
		var ExamtypesController,
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

			// Initialize the Examtypes controller.
			ExamtypesController = $controller('ExamtypesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Examtype object fetched from XHR', inject(function(Examtypes) {
			// Create sample Examtype using the Examtypes service
			var sampleExamtype = new Examtypes({
				name: 'New Examtype'
			});

			// Create a sample Examtypes array that includes the new Examtype
			var sampleExamtypes = [sampleExamtype];

			// Set GET response
			$httpBackend.expectGET('examtypes').respond(sampleExamtypes);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.examtypes).toEqualData(sampleExamtypes);
		}));

		it('$scope.findOne() should create an array with one Examtype object fetched from XHR using a examtypeId URL parameter', inject(function(Examtypes) {
			// Define a sample Examtype object
			var sampleExamtype = new Examtypes({
				name: 'New Examtype'
			});

			// Set the URL parameter
			$stateParams.examtypeId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/examtypes\/([0-9a-fA-F]{24})$/).respond(sampleExamtype);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.examtype).toEqualData(sampleExamtype);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Examtypes) {
			// Create a sample Examtype object
			var sampleExamtypePostData = new Examtypes({
				name: 'New Examtype'
			});

			// Create a sample Examtype response
			var sampleExamtypeResponse = new Examtypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Examtype'
			});

			// Fixture mock form input values
			scope.name = 'New Examtype';

			// Set POST response
			$httpBackend.expectPOST('examtypes', sampleExamtypePostData).respond(sampleExamtypeResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Examtype was created
			expect($location.path()).toBe('/examtypes/' + sampleExamtypeResponse._id);
		}));

		it('$scope.update() should update a valid Examtype', inject(function(Examtypes) {
			// Define a sample Examtype put data
			var sampleExamtypePutData = new Examtypes({
				_id: '525cf20451979dea2c000001',
				name: 'New Examtype'
			});

			// Mock Examtype in scope
			scope.examtype = sampleExamtypePutData;

			// Set PUT response
			$httpBackend.expectPUT(/examtypes\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/examtypes/' + sampleExamtypePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid examtypeId and remove the Examtype from the scope', inject(function(Examtypes) {
			// Create new Examtype object
			var sampleExamtype = new Examtypes({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Examtypes array and include the Examtype
			scope.examtypes = [sampleExamtype];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/examtypes\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleExamtype);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.examtypes.length).toBe(0);
		}));
	});
}());