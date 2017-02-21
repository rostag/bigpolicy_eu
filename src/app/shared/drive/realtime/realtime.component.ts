/// <reference path="../../../../../node_modules/@types/gapi/index.d.ts"/>
/// <reference path="../../../../../node_modules/@types/gapi.auth2/index.d.ts"/>
/// <reference path="../../../../../node_modules/@types/google-drive-realtime-api/index.d.ts"/>
/// <reference path="./google-drive-api.d.ts"/>
import { Component, OnInit, AfterViewInit, Input, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-bp-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RealtimeComponent implements AfterViewInit {

  savedSignInUserInfo: gapi.auth2.GoogleUser = null;

  fileToUpload = null;
  fileToUploadName = '';

  gdrive_authorize = true;
  gdrive_signout = false;

  files = [];

  constructor(
    private ref: ChangeDetectorRef
  ) {}

  /**
  *  On load, called to load the auth2 library and API client library.
  */
  ngAfterViewInit() {
    // console.log('gapi:', gapi);
    gapi.load('client:auth2', () => { this.initClient(this); });
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
      this.savedSignInUserInfo = gapi.auth2.getAuthInstance().currentUser.get();
      this.listFiles();
    } else {
      this.gdrive_authorize = true;
      this.gdrive_signout = false;
    }
    console.log('Is signed in: ', isSignedIn, this.savedSignInUserInfo);
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
    this.upload();
    return false;
  }

  handleUploadFilenameChange(evt, a, b) {
    const fullPath = evt.target.value;
    if (fullPath) {
      const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      let filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      this.fileToUpload = evt.target.files[0];
      this.fileToUploadName = filename;
    }
  }

  /**
   * Initiate the upload.
   */
  upload() {
    const self = this;
    const xhr = new XMLHttpRequest();

    const metadata = {
      'name': this.fileToUpload.name,
      'title': this.fileToUpload.name,
      'mimeType': this.fileToUpload.type,
      'description': 'Stuff about the file'
    };

    xhr.open('POST', 'https://www.googleapis.com/drive/v3/files?uploadType=multipart', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.savedSignInUserInfo.getAuthResponse().access_token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Upload-Content-Length', this.fileToUpload.size);
    xhr.setRequestHeader('X-Upload-Content-Type', this.fileToUpload.type);

    xhr.onload = (e: any) => {
      const resp = JSON.parse(e.target.response);
      this.sendFile(resp.id);
    };
    xhr.onerror = (err) => console.log('upload error:', err);
    xhr.send(JSON.stringify(metadata));
  };

  /**
   * Send the actual file content.
   *
   * @private
   */
  sendFile(fileId) {
    const content = this.fileToUpload;
    const end = this.fileToUpload.size;

    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + fileId, true);
    xhr.setRequestHeader('Content-Type', this.fileToUpload.type);
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.savedSignInUserInfo.getAuthResponse().access_token);
    xhr.setRequestHeader('X-Upload-Content-Type', this.fileToUpload.type);
    xhr.onload = (res) => console.log('upload res:', res);
    xhr.onerror = (err) => console.log('upload error:', err);
    xhr.send(content);
  };

  /**
   * Print files.
   */
  listFiles() {
    const filesz = [];
    let filelist = '';
    gapi.client.drive.files.list({
      'pageSize': 5,
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
}
