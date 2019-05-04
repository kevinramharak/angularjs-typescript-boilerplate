import uirouter from '@uirouter/angularjs';
import angular from 'angular';

import env from '@env';

import core from './core';
import pages from '@pages';

angular.element(document).ready(() => {
    const app = angular.module('app', [
        uirouter,
        core.name,
        ...pages.map(module => module.name)
    ]);
    angular.bootstrap(document.body, [app.name], {
        strictDi: !env.debug
    });
});
