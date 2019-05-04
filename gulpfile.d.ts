declare module 'tsify' {
    export default function tsify(...args: any[]): any[];
}

declare module 'gulp-streamify' {
    import { Duplex, Stream } from "stream";
    function streamify(input: Stream): Duplex;
    export default streamify;
}
