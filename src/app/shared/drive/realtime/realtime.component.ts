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

  urlToUpload = '';

  constructor(
    private ref: ChangeDetectorRef
  ) {}

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  handleClientLoad() {
    console.log('gapi:', gapi);
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
    // this.createFile();

    this.upload();
    // this.uploadFile3(this.fileToUpload);
    // this.uploadFileMultipart();
    // this.uploadFile();
    // this.createFileWithJSONContent('BP_1', {'hi': 'hi'}, res => console.log(res));
    // this.preupload(
    //   'https://www.googleapis.com/upload/drive/v3/files?uploadType=media',
    //   this.savedSignInUserInfo.getAuthResponse().access_token
    // );

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
      console.log('filename:', filename, this.fileToUpload);
    }
  }

  uploadFile3(text, callback = null) {

      const boundary = '287032381131322';
      const delimiter = '\r\n--' + boundary + '\r\n';
      const close_delim = '\r\n--' + boundary + '--';

      const contentType = this.fileToUpload.type || 'multipart/form-data';
      const metadata = {
        'mimeType': contentType,
        'name': this.fileToUploadName,
        'description': 'Oh my file =)'
      };

      const reader = new FileReader();

      reader.onload = function(evt: any) {
        // xhr.send(evt.target.result);

        console.log('reader', contentType, evt);

        const multipartRequestBody =
            delimiter +  'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter + 'Content-Type: ' + contentType + '\r\n' + '\r\n' +
            evt.target.result +
            close_delim;

        if (!callback) {
          callback = function(file) { console.log('Update Complete ', file); };
        }

        gapi.client.request({
          'path': 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
          'method': 'POST',
          'params': {'uploadType': 'multipart'},
          'headers': {'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'},
          'body': multipartRequestBody,
          callback: callback
        });
      };
      reader.readAsBinaryString(text);
    }

  // WIP
  uploadFileMultipart() {
    const form = new FormData();
    const xhttp = new XMLHttpRequest();
    xhttp.responseType = 'blob';

    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        console.log('Uploaded');
      } else if (xhttp.readyState === 4 ) {
        console.log('Upload result:', xhttp.status, xhttp.response);
      }
    };

    const formData: any = new FormData();
    formData.append('myFile', this.fileToUpload);
    // formData.append('title', 'file_name.extension');
    // formData.append('mimeType', 'mime/type');
    // formData.append('description', 'Stuff about the file');

    xhttp.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', true);
    xhttp.setRequestHeader('Authorization', 'Bearer ' + this.savedSignInUserInfo.getAuthResponse().access_token);
    xhttp.send(this.fileToUpload);
    // xhttp.send(formData);
  }

  uploadFile() {
    const form = new FormData();
    const xhttp = new XMLHttpRequest();
    xhttp.responseType = 'blob';

    xhttp.onreadystatechange = function() {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        console.log('Uploaded');
      } else if (xhttp.readyState === 4 ) {
        console.log('Upload result:', xhttp.status, xhttp.response);
      }

    };
    xhttp.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=media', true);
    xhttp.setRequestHeader('Authorization', 'Bearer ' + this.savedSignInUserInfo.getAuthResponse().access_token);
    xhttp.send(this.fileToUpload);
  }

  /**
   * Initiate the upload.
   */
  preupload(url, token) {
    const self = this;
    const xhr = new XMLHttpRequest();
    const fileMetadata = {
      name: this.fileToUploadName,
      title: this.fileToUploadName
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.setRequestHeader('X-Upload-Content-Length', size);
    // xhr.setRequestHeader('X-Upload-Content-Type', contentType);

    xhr.onload = function(e) {
      const location = e.target.getResponseHeader('Location');
      this.url = location;
      this.uploadFile();
    }.bind(this);
    // xhr.onerror = this.onUploadError_.bind(this);
    xhr.send(JSON.stringify(fileMetadata));
  };

  // WIP WIP WIP
  uploadDocFile(name, data, callback) {
    const boundary = '-------314159265358979323846';
    const delimiter = '\r\n--' + boundary + '\r\n';
    const close_delim = '\r\n--' + boundary + '--';

    const contentType = 'application/msword';

    const metadata = {
      'name': name,
      'mimeType': contentType
    };

    const multipartRequestBody =
          delimiter +
          'Content-Type: ' + contentType + '\r\n\r\n' +
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
        console.log('upload e:', e, resp);
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
      // xhr.setRequestHeader('Content-Range', 'bytes ' + 0 + '-' + (this.fileToUpload.size - 1) + '/' + this.fileToUpload.size);
      xhr.setRequestHeader('X-Upload-Content-Type', this.fileToUpload.type);
      // xhr.setRequestHeader('X-Upload-Content-Length', this.fileToUpload.size);
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

  ////////////////////////////////////////////////////////////////////////////

}
