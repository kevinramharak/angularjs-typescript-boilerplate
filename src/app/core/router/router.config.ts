import { StateProvider, UrlRouterProvider, TargetState, StateService, $InjectorLike, LocationServices, UIInjector } from '@uirouter/angularjs';

function config($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider) {
    $stateProvider.state('404', {
        url: '/404',
        template: '404 - Page Not Found'
    });

    $stateProvider.onInvalid(onInvalidCallback);

    // this will redirect to the home state on load and else redirect to the 404 state
    $urlRouterProvider.otherwise(function ($injector: $InjectorLike, $location: LocationServices) {
        if ($location.path() === '') {
            return '/';
        } else {
            return '/404';
        }
    });
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];

// this will catch invalid state's and redirect them to the 404 state
function onInvalidCallback(to?: TargetState, from?: TargetState, $injector?: UIInjector) {
    const $state: StateService = $injector!.get('$state');
    return $state.target('404', {
        to,
        from
    });
}

export default config;
