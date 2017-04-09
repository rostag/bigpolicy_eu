import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Component, Input, Output, OnChanges, ViewChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
// import { Router } from '@angular/router';

// OBSOLETE
// declare var firebase: any;

interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

/**
 * StephenFluin/upload.component.ts: https://gist.github.com/StephenFluin/6c63bb45e76629e79da08d3ac0472834
 */
export class UploaderComponent implements OnChanges {
  /**
   * The name of the folder for images
   * eg. posts/angular-is-awesome
   */
  @Input() folder = 'bp-user-files';

  @Input() listFiles = 'no';

  listFilesOnStart = false;

  // FIXME Why Oncnages were neded to bloody get rid of this for prod build:
  // ERROR in /Users/rsiryk/dev/BP/bp/src/$$_gendir/app/shared/uploader/uploader.component.ngfactory.ts (1,1):
  // Operator '===' cannot be applied to types 'boolean' and '"fab"'.
  @Input() buttonType = 'nofab';

  @Input() buttonLabel = 'Завантажити фото';

  useFabButton = false;

  @ViewChild('fileInput') fileInput;

  // After successful upload, will emit uploadedFileUrl taken from 'snapshot' object, see below
  @Output() uploadedFileUrlChange: EventEmitter<string> = new EventEmitter<string>();

  // Populated after upload from 'snapshot' object, see below
  uploadedFileUrl: string;

  fileList: FirebaseListObservable<Image[]>;
  imageList: Observable<Image[]>;

  // Sibfolder - just in case
  postfix = '';

  //
  // State management
  //
  uploadInProgress = false;

  fileToUpload = null;
  fileToUploadName = null;

  // For temporarily showing upload finished
  uploadJustHaveFinished = false;

  // For one-click uploads via fab button
  uploadImmediately = false;

  constructor(
    public af: AngularFire
    // , public router: Router
  ) {}

  ngOnChanges(changes) {

    if (changes.buttonType) {
      this.useFabButton = changes.buttonType.currentValue === 'fab';
    }

    if (changes.listFiles) {
      this.listFilesOnStart = changes.listFiles.currentValue === 'yes';
    }

    console.log('new values for folder');
    const storage = firebase.storage();

    this.fileList = this.af.database.list(`/${this.folder}${this.postfix}`);
    console.log('Rendering all images in ', `/${this.folder}${this.postfix}`);

    this.imageList = this.fileList.map( itemList =>
      itemList.map( item => {
        const pathReference = storage.ref(item.path);
        const result = {$key: item.$key, downloadURL: pathReference.getDownloadURL(), path: item.path, filename: item.filename};
        console.log(result);
        return result;
      })
    );
  }

  initUpload() {
    this.uploadInProgress = true;
    // Create a root reference
    const storageRef = firebase.storage().ref();

    // This currently only grabs item 0, TODO refactor it to grab them all
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('fileInput')).files[0]]) {
      // Make local copies of services because 'this' will be clobbered
      // const router = this.router;
      const af = this.af;
      const folder = this.folder + this.postfix;
      const path = `/${this.folder}/${selectedFile.name}`;

      // Upload happens here
      const iRef = storageRef.child(path);
      // console.log(`Upload a file, path = ${path}, selectedFile: ${selectedFile}, folder = ${folder}, iRef = ${iRef}`);
      iRef.put(selectedFile).then((snapshot) => {
        // console.log('Uploaded a blob or file! Now storing the reference at', folder, snapshot.downloadURL, snapshot);
        this.uploadedFileUrl = snapshot.downloadURL;
        af.database.list(`/${folder}`).push({ path: path, filename: selectedFile.name });
        this.onFileUploadComplete();
      });
    }

  }
  delete(image: Image) {
    const storagePath = image.path;
    const referencePath = `${this.folder}${this.postfix}/` + image.$key;

    // Do these as two separate steps so you can still try delete ref if file no longer exists

    // Delete from Storage
    firebase.storage().ref().child(storagePath).delete()
    .then(
      () => {},
      (error) => console.error('Error deleting stored file', storagePath)
    );

    // Delete references
    this.af.database.object(referencePath).remove();
  }

  ///////////////////////////////////////

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
      if (this.uploadImmediately) {
        this.handleUploadFileClick();
        this.uploadImmediately = false;
      }
    }
  }

  handleSelectFileClick(event, uploadImmediately = false) {
    this.uploadImmediately = uploadImmediately;
    this.fileInput.nativeElement.click();
    return false;
  }

  handleUploadFileClick(event = null) {
    this.initUpload();
    return false;
  }

  onFileUploadComplete() {
    this.fileToUpload = null;
    this.fileToUploadName = '';
    this.uploadInProgress = false;
    this.uploadJustHaveFinished = true;

    // Output the value
    this.uploadedFileUrlChange.emit(this.uploadedFileUrl);

    setTimeout(this.onClearUploadJustHaveFinishedFlag, 3000, this);
  }

  onClearUploadJustHaveFinishedFlag(host) {
    host.uploadJustHaveFinished = false;
  }

}
