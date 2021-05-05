var app = angular.module('crud-mirror-app', [], function ($compileProvider) {
    $compileProvider.directive('compile', function ($compile) {
        return function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    return scope.$eval(attrs.compile);
                },
                function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                }
            );
        };
    });
});

app.controller('appController', ['$scope', function ($scope) {

    $scope.tempTemplate = '<h2>{{person.firstName}}</h2>';
    $scope.person = {};

    //TODO: get rid of default values
    $scope.persons = [{
        id: '-1',
        firstName: 'defaultFirstName',
        lastName: 'defaultLastName',
        gender: 'male',
        email: 'default@mail.org',
        phone: '+314 7736221',
        template: '',
    }];

    $scope.update = function (person) {
        $scope.master = angular.copy(person);
    };

    $scope.reset = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
    };

    $scope.save = function (personObj) {
        var firstName = personObj.firstName;
        var lastName = personObj.lastName;
        var gender = personObj.gender;

        var email = personObj.email;
        var phone = personObj.phone;

        //TODO; use static factory methods instead of raw constructor calls
        const person = new Person(null, firstName, lastName, gender, email, phone, null);
        $scope.persons.push(person);

        $scope.person = person;


        // const person = new Person(this.person.firstName, this.person.lastName, this.person.gender, this.person.email, this.person.phone);
        // this.personService.addPerson(person);

        // console.warn('AddComponentComponent: Added person ' + JSON.stringify(this.person));

        const data = JSON.parse('{ "operation": "add", "data": "" }');
        data.data = JSON.stringify(person);

        this.remoteWindow = window.frames[0];
        const message = JSON.stringify(data);
        this.remoteWindow.postMessage(message, 'http://localhost:8080/');
        console.log('send: ' + message);
    };

    $scope.saveTemplate = function () {
        $scope.person.template = $scope.tempTemplate;

        //TODO: extract into function
        for (var i = 0; i < $scope.persons.length; i++) {
            if ($scope.person.id === $scope.persons[i].id) {
                $scope.persons[i].template = $scope.tempTemplate;
            }
        }
    };

    // ditto
    $scope.refreshCurrentPerson = function (personId) {
        console.warn("refresh triggered for ID: " + personId);
        var person;
        for (var i = 0; i < $scope.persons.length; i++) {
            if (personId === $scope.persons[i].id) {

                person = Person.fromObject($scope.persons[i]);
                $scope.person = person;                                  /* setting current person */
            }
        }
    };

    window.addEventListener('message', (event) => $scope.processIncomingMessage(event), false);
    $scope.processIncomingMessage = function (event) {
        if (event.origin !== window.origin) {

            console.log("data: " + event.data);

            var response = JSON.parse(event.data);

            var responseOperation = response.operation;
            var responseDataObj = JSON.parse(response.data);

            console.log("Operation received: " + responseOperation);
            console.log("For person: " + JSON.stringify(responseDataObj));

            localStorage.setItem('operation', responseOperation);
            localStorage.setItem('data', JSON.stringify(responseDataObj));
        }
    };

    $scope.operation = null;
    $scope.data = null;

    /* LocalStorage change listener */
    //TODO: Add operations dispatcher
    window.addEventListener('storage', function (e) {

        if (e.key === 'operation' && e.oldValue === null && e.newValue !== null) {
            console.log("saving operation: " + e.newValue);

            $scope.operation = e.newValue;
            localStorage.removeItem('operation');
        }

        if (e.key === 'data' && e.oldValue === null && e.newValue !== null) {
            console.log("saving data: " + e.newValue);

            $scope.data = e.newValue;
            localStorage.removeItem('data');

            console.log("object " + $scope.data);

            var p = JSON.parse($scope.data);
            const person = new Person(p._id, p._firstName, p._lastName, p._gender, p._email, p._phone, p._template);
            $scope.person = person;

            console.warn("pushing id: " + p._id);
            $scope.persons.push($scope.person);
            $scope.$apply();                                                    /* in order to refresh the scope*/
            console.log("pushed person: " + JSON.stringify($scope.person));
        }
    });
}]);
