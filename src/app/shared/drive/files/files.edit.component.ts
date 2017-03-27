/// <reference path="../../../../../node_modules/@types/gapi/index.d.ts"/>
/// <reference path="../../../../../node_modules/@types/gapi.auth2/index.d.ts"/>
/// <reference path="./google-drive-api.d.ts"/>

// TODO Implement file deletion via UI
// FIXME Check on file list refresh — now, trashed files are still visible

import { Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import { Component, AfterViewInit, ViewChild, Input, Output, EventEmitter,
         ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bp-files',
  templateUrl: './files.edit.component.html',
  styleUrls: ['./files.edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FilesEditComponent implements AfterViewInit {

  savedSignInUserInfo: gapi.auth2.GoogleUser = null;
  gdrive_authorized = false;

  fileToUpload = null;
  fileToUploadName = '';
  folderForUploads = null;
  uploadInProgress = false;
  fileList = [];

  // TODO Parse user to get his GoogleDrive
  @Input() userService;
  @Output() onFileListUpdate = new EventEmitter<Array<any>>();
  @ViewChild('fileInput') fileInput;

  constructor( private ref: ChangeDetectorRef ) {}

  /**
   * On load, called to load the auth2 library and API client library.
   */
  ngAfterViewInit() {
    console.log('BP User:', this.userService);
    gapi.load('client:auth2', () => { this.initClient(this); });
  }

  private updateFilesList(files: Array<any>) {
    this.fileList = files;
    this.onFileListUpdate.emit(this.fileList);
    this.updateUIOnChange();
  }

  private updateUIOnChange() {
    this.ref.markForCheck();
    this.ref.detectChanges();
  }

  /**
   *  Initializes GDrive API client library and sets up sign-in state listeners.
   */
  initClient(that) {
    // FIXME_SEC
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
    this.gdrive_authorized = isSignedIn;
    if (isSignedIn) {
      this.savedSignInUserInfo = gapi.auth2.getAuthInstance().currentUser.get();
      this.getFiles();
    } else {
      console.log('All the saints are signed out');
      this.updateFilesList([{}]);
    }
    // console.log('Is signed in: ', isSignedIn, this.savedSignInUserInfo);
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(event) {
    console.log('All the saints are signing in');
    gapi.auth2.getAuthInstance().signIn();
    return false;
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick(event) {
    console.log('All the saints are signing out');
    gapi.auth2.getAuthInstance().signOut();
    return false;
  }

  // ---------------------------------------------------------------------------
  // Uploading User's files
  // ---------------------------------------------------------------------------

  handleSelectFileClick() {
    this.fileInput.nativeElement.click();
  }

  handleUploadFilenameChange(evt) {
    const fullPath = evt.target.value;
    if (fullPath) {
      const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      let filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      this.fileToUpload = evt.target.files[0];
      this.fileToUploadName = filename;
      this.updateUIOnChange();
    }
  }

  handleUploadFileClick(event) {
    this.initUpload();
    return false;
  }

  /**
   * Initiate the upload.
   */
  initUpload() {
    const self = this;
    const xhr = new XMLHttpRequest();
    const file = this.fileToUpload;
    this.uploadInProgress = true;
    this.updateUIOnChange();

    // FIXME Add description
    const metadata = {
      'name': file.name,
      'title': file.name,
      'mimeType': file.type,
      'description': 'This file was uploaded via BigPolicy',
      parents: [ this.folderForUploads.id ]
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
    xhr.onerror = (err) => console.log('Upload error:', err);
    xhr.send(JSON.stringify(metadata));
  };

  /**
   * Send the actual file content.
   *
   * @private
   */
  sendFile(fileId) {
    this.fileToUpload.id = fileId;
    const content = this.fileToUpload;
    const end = this.fileToUpload.size;

    const xhr = new XMLHttpRequest();
    xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + fileId, true);
    xhr.setRequestHeader('Content-Type', this.fileToUpload.type);
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.savedSignInUserInfo.getAuthResponse().access_token);
    xhr.setRequestHeader('X-Upload-Content-Type', this.fileToUpload.type);
    xhr.onload = (res) => this.onFileUploadComplete();
    xhr.onerror = (err) => console.log('Upload error:', err);
    xhr.send(content);
  };

  onFileUploadComplete() {
    this.fileToUpload = null;
    this.fileToUploadName = '';
    this.uploadInProgress = false;
    this.listFiles();
  }

  // ---------------------------------------------------------------------------
  // Listing User's files
  // ---------------------------------------------------------------------------

  getFiles() {
    const preloaderFile = {
      id: '',
      webViewLink: '',
      title: 'Завантажую список файлів...',
      name: 'Завантажую список файлів...'
    };

    this.updateFilesList([preloaderFile]);

    this.getFolder();
  }

  /**
   * Gets the 'BigPolicy Files' folder for given user or creates if there's no such folder
   */
  getFolder() {
    const folderMetadata = {
      q: 'name = "BigPolicy Files"',
      fields: 'nextPageToken, files(id, name)'
      // pageToken: pageToken
    };

    // console.log('Get folder:', folderMetadata);

    gapi.client.drive.files.list(folderMetadata)
      .execute((resp, raw_resp) => {
        const folder = resp.files[0];
        if ( !folder ) {
          this.createFolder();
          return;
        }
        this.initFolder(folder);
      });
  }

  initFolder(folder) {
    this.folderForUploads = folder;
    console.log('Got Drive Folder Id: ', this.folderForUploads);
    this.listFiles();
  }

  createFolder() {
    const fileMetadata = {
      'name' : 'BigPolicy Files',
      'mimeType' : 'application/vnd.google-apps.folder',
    };

    gapi.client.drive.files.create({
       resource: fileMetadata,
       fields: 'id'
    }, null).execute((resp, raw_resp) => {
        console.log('Created Folder Id: ', resp);
        // this.folderForUploads = resp;
        this.initFolder(resp);
    });
  }

  /**
   * Create a list of files loaded from gdrive.
   */
  listFiles() {
    gapi.client.drive.files.list({
      'q': '"' + this.folderForUploads.id + '" in parents',
      'pageSize': 7,
      'fields': 'nextPageToken, files(id, name, webViewLink, mimeType)',
    }).then((response) => {
      const files = [];
      const responseFiles = response.result.files;
      if (responseFiles && responseFiles.length > 0) {
        for (let i = 0; i < responseFiles.length; i++) {
          const file = responseFiles[i];
          files.push(file);
        }
        this.updateFilesList(files);
      }
    });
  }
}
