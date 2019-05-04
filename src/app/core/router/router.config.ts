import { StateProvider, UrlRouterProvider } from '@uirouter/angularjs';

function config($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider) {
    $stateProvider.state('404', {
        url: '/404',
        template: '404 - Page Not Found'
    });

    $urlRouterProvider.otherwise('/404');
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];

export default config;
