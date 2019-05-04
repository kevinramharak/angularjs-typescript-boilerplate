import angular from 'angular';

import error from './error';
import router from './router';

const core = angular.module('app.core', [error.name, router.name]);

export default core;
