/// <reference path="../../../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../../../node_modules/@types/gapi.auth2/index.d.ts" />
/// <reference path="../../../../../node_modules/@types/google-drive-realtime-api/index.d.ts" />
/// <reference path="./google-drive-api.d.ts" />

import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-bp-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css']
})
export class RealtimeComponent implements AfterViewInit {

    gdrive_authorize = false;
    gdrive_signout = false;

    filelist = [];

    /**
    * On component load, call to load the auth2 library.
    */
    ngAfterViewInit() {
      gapi.load('client:auth2', () => { this.initClient(this); });
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient(that) {
      const CLIENT_ID = '254701279966-lgp72d0ou71o9865v7tp55fmc08ac661.apps.googleusercontent.com';

      const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      const SCOPES = [
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.appdata'
      ];

      console.log('this is ', this);
      // console.log('that is ', that);

      gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then( (res) => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen( (result) => { this.updateSigninStatus(result); } );

        // Handle the initial sign-in state.
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        this.gdrive_authorize = false;
        this.gdrive_signout = true;
        this.listFiles();
      } else {
        this.gdrive_authorize = true;
        this.gdrive_signout = false;
      }
      console.log('is signed in: ', isSignedIn);
    }

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick(event) {
      console.log('All the saints are signing in');
      gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
    }

    // handleAddFileClick(event) {
    //   this.createFile();
    // }

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    addFileToList(file) {
      console.log('adding to file list:', file);
      this.filelist.push(file);
    }

    /**
     * Print files.
     */
    listFiles() {
      gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': 'nextPageToken, files(id, name, size)'
      }).then( (response) => {
        const files = response.result.files;
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            this.addFileToList(file);
          }
        }
      });
    }

    // createFile() {
    //   gapi.client.drive.files.create({
    //     // uploadType: ,
    //     ignoreDefaultVisibility: true,
    //     useContentAsIndexableText: true
    //   }).then( (response) => {
    //     console.log('response:', response);
    //   });
    // }
}
