import Environment from '@env';

function config(env: typeof Environment, $compileProvider: ng.ICompileProvider, $logProvider: ng.ILogProvider) {
    // strict mode
    $compileProvider.strictComponentBindingsEnabled(true);

    // performance improvements
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);

    // debug info
    $compileProvider.debugInfoEnabled(env.debug);

    // log
    $logProvider.debugEnabled(env.debug);
}

config.$inject = ['env', '$compileProvider', '$logProvider'];

export default config;