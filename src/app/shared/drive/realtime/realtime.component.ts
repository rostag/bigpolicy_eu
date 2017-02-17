/// <reference path="../../../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../../../node_modules/@types/gapi.auth2/index.d.ts" />
/// <reference path="../../../../../node_modules/@types/google-drive-realtime-api/index.d.ts" />
/// <reference path="./google-drive-api.d.ts" />

import { Component, OnInit, AfterViewInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bp-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RealtimeComponent implements AfterViewInit {

  gdrive_authorize = true;
  gdrive_signout = false;

  files = [];

  DEFAULT_FILE = {
    content: 'hi from bp!',
    metadata: {
      id: null,
      title: 'untitled.txt',
      mimeType: 'text/plain',
      editable: true
    }
  };

  file = this.DEFAULT_FILE;

  constructor(
    private ref: ChangeDetectorRef
  ) {}

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
    const SCOPES = [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.file'
    ].join(' ');

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

  handleAddFileClick(event) {
    // this.createFile();

    this.createFileWithJSONContent( 'BP_' + Math.round(Math.random() * 100) + '_', {'hi': 'hi'}, res => console.log(res) );

    return false;
  }

  createFile() {
    // this.save();
    gapi.client.drive.files.create({
      uploadType: 'media',
      ignoreDefaultVisibility: true,
      useContentAsIndexableText: true,

    }).then( (response) => {
      console.log('response:', response);
    });
  }

  createFileWithJSONContent (name, data, callback) {
    const boundary = '-------314159265358979323846';
    const delimiter = '\r\n--' + boundary + '\r\n';
    const close_delim = '\r\n--' + boundary + '--';

    const contentType = 'application/json';

    const metadata = {
        'name': name,
        'mimeType': contentType
      };

    const multipartRequestBody =
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + contentType + '\r\n\r\n' +
          data +
          close_delim;

    const request = gapi.client.request({
          'path': '/upload/drive/v3/files',
          'method': 'POST',
          'params': {'uploadType': 'multipart'},
          'headers': {
            'Content-Type': 'multipart/related; boundary="' + boundary + '"'
          },
          'body': multipartRequestBody});
      if (!callback) {
        callback = function(file) {
          console.log(file);
        };
      }
      request.execute(callback);
  }

  /**
     * Internal helper to saves the current file. If the file is new, redirects to the correct URL once complete.
     *
     * @return {Promise} promise that resolves once the save is complete
     */
    save() {
      console.log('File to be saved');
      gapi.client.drive.files.save(this.file.metadata, this.file.content).then((result) => {
        this.redirectIfChanged(result.metadata.id);
        this.file = result;
        console.log('File saved');
        return this.file;
      }, (err) => {
        console.log('Unable to save file');
      });
    };

    redirectIfChanged (id) {
      // if (this.file.metadata.id != id) {
      //   location.path('/edit/' + id);
      //   location.search('');
      //   location.replace();
      // }
    };

  /**
   * Print files.
   */
  listFiles() {
    const filesz = [];
    let filelist = '';
    gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': 'nextPageToken, files(id, name)'
    }).then( (response) => {
      const files = response.result.files;
      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          this.files.push(file);
          filelist += '<li>' + file.name + '</li>';
        }
        // this.files = filesz;
        this.ref.markForCheck();
        this.ref.detectChanges();
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////

}
