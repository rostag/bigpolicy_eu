// /<reference path="./realtime/index.d.ts" />
// /<reference path="../../../../typings/globals/google-drive-realtime-api/index.d.ts" />

/* Download the declaration file (*.d.ts) for the Google Drive Realtime API here:
https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/google-drive-realtime-api
http://stackoverflow.com/questions/35374878/angular-2-with-google-drive-realtime-api

This provides a TypeScript wrapper for the API.
Specifically, it defines a module named gapi.drive.realtime whose classes can be accessed in Angular2.

To tell the compiler about the declaration file, you need to add the following line to your TypeScript source file:

Then you need to import the module's features. One way to do this is with the following import command:

Then you can access the module's classes under the Drive namespace:
  Drive.Collaborator,
  Drive.CollaborativeObject, and so on. */


import { Injectable } from '@angular/core';

@Injectable()
export class DriveService {

  constructor (
    // private coolab: Collaborator
    // private t: BPAppType
  ) {
    console.log('✇ Hi, from Drive Service ✇');
  }

  checkConnection() {
    console.log('Drive Service: checkConnection');
  }
}
