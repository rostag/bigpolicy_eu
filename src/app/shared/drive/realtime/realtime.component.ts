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

    // authorizeButton = document.getElementById('authorize-button');
    // signoutButton = document.getElementById('signout-button');
    authorizeButtonDisplay = true;
    signoutButtonDisplay = false;

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    handleClientLoad() {
      gapi.load('client:auth2', () => { this.initClient(this); });
    }

    ngAfterViewInit() {
      this.handleClientLoad();
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient(that) {
      // Client ID and API key from the Developer Console
      const CLIENT_ID = '254701279966-lgp72d0ou71o9865v7tp55fmc08ac661.apps.googleusercontent.com';

      // Array of API discovery doc URLs for APIs used by the quickstart
      const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

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
        this.authorizeButtonDisplay = false;
        this.signoutButtonDisplay = true;
        this.listFiles();
      } else {
        this.authorizeButtonDisplay = true;
        this.signoutButtonDisplay = false;
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

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    appendPre(message) {
      const pre = document.getElementById('content');
      const textContent = document.createTextNode(message + '\n');
      pre.appendChild(textContent);
    }

    /**
     * Print files.
     */
    listFiles() {
      gapi.client.drive.files.list({
        'pageSize': 10,
        'fields': 'nextPageToken, files(id, name)'
      }).then( (response) => {
        this.appendPre('Files:');
        const files = response.result.files;
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            this.appendPre(file.name + ' (' + file.id + ')');
          }
        } else {
          this.appendPre('No files found.');
        }
      });
    }
}
