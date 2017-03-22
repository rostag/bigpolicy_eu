// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;

// Used for app version injection via json
// Details: https://hackernoon.com/import-json-into-typescript-8d465beded79
declare module '*.json' {
    const value: any;
    export default value;
}
