import { StateService } from "@uirouter/core";

function run($rootScope: ng.IRootScopeService, $state: StateService) {
    $rootScope.$on('$stateNotFound', function () {
        console.log(arguments);
        $state.go('404');
    });
}

run.$inject = ['$rootScope', '$state'];

export default run;
