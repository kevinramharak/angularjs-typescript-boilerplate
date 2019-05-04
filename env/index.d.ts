declare module '@env' {
    interface IEnvironment {
        debug: boolean;
    }

    const Environment: IEnvironment;

    export = Environment;
}