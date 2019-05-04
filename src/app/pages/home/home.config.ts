import { StateProvider } from "@uirouter/angularjs";

import controller from './home.controller';

function config($stateProvider: StateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/src/app/pages/home/home.template.html',
        controller: controller.name,
        controllerAs: '$ctrl',
    });
}

config.$inject = ['$stateProvider'];

export default config;