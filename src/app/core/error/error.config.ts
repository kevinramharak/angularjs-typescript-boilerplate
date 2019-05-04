function config($provide: ng.auto.IProvideService) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

config.$inject = ['$provide'];

function extendExceptionHandler($delegate: ng.IExceptionHandlerService) {
    return function exceptionHandler(exception: Error, cause: string) {
        $delegate(exception, cause);
        
        // custom error reporting here
    };
}

extendExceptionHandler.$inject = ['$delegate'];

export default config;