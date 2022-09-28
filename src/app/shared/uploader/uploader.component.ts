import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Component, Input, Output, OnChanges, ViewChild, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {map} from 'rxjs/operators';

interface Image {
  path: string;
  filename: string;
  downloadURL?: Promise<any>;
  $key?: string;
}

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
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

  // FIXME Why onChanges were needed to get rid of this for prod build:
  // ERROR in /Users/rsiryk/dev/BP/bp/src/$$_gendir/app/shared/uploader/uploader.component.ngfactory.ts (1,1):
  // Operator '===' cannot be applied to types 'boolean' and '"fab"'.
  @Input() buttonType = 'regular';

  @Input() buttonLabel = 'Завантажити';

  useFabButton = false;

  @ViewChild('fileInput', { static: true }) fileInput;

  // After successful upload, will emit uploadedFileUrl taken from 'snapshot' object, see below
  @Output() uploadedFileUrlChange: EventEmitter<string> = new EventEmitter<string>();

  // Populated after upload from 'snapshot' object, see below
  uploadedFileUrl: string;

  fileList: AngularFireList<Image>;
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
    public afDb: AngularFireDatabase
  ) {
    // console.log('afDb:', this.afDb);
  }

  ngOnChanges(changes) {

    if (changes.buttonType) {
      this.useFabButton = changes.buttonType.currentValue === 'fab';
    }

    if (changes.listFiles) {
      this.listFilesOnStart = changes.listFiles.currentValue === 'yes';
    }

    // console.log('new values for folder');
    const storage = firebase.storage();

    console.log('Images in ', `/${this.folder}${this.postfix}`);
    this.fileList = this.afDb.list(`/${this.folder}${this.postfix}`);


    // this.itemsRef = db.list('items');
    // this.itemsRef.snapshotChanges(['child_added'])
    // this.imageList = this.fileList.snapshotChanges()
    //   .subscribe(actions => {
    //     actions.forEach(action => {
    //       console.log(action.type);
    //       console.log(action.key);
    //       console.log(action.payload.val());
    //     });
    //   });

    // FIXME
    this.imageList = this.fileList.valueChanges().pipe(
      map(itemList =>
        itemList.map((item: Image) => {
          return {
            $key: item.$key,
            downloadURL: storage.ref(item.path).getDownloadURL(),
            path: item.path,
            filename: item.filename
          };
        })
      )
    );
  }

  initUpload() {
    this.uploadInProgress = true;
    // Create a root reference
    const storageRef = firebase.storage().ref();

    // This currently only grabs item 0, TODO refactor it to grab them all
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('fileInput')).files[0]]) {
      const folder = this.folder + this.postfix;
      const path = `/${this.folder}/${selectedFile.name}`;

      // Upload
      const iRef = storageRef.child(path);
      // console.log(`Upload a file, path = ${path}, selectedFile: ${selectedFile}, folder = ${folder}, iRef = ${iRef}`);
      const uploadTask = iRef.put(selectedFile);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              // console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              // console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.log('ERROR:', error)

          // A full list of error codes is available at https://firebase.google.com/docs/storage/web/handle-errors
          switch (error['code']) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL()
            .then(
              (downloadURL) => {
                // console.log('Uploaded file available at: ', downloadURL);
                this.uploadedFileUrl = downloadURL;
                this.afDb.list(`/${folder}`).push({path: path, filename: selectedFile.name});
                this.onFileUploadComplete();
              },
              (error) => console.error('Error uploading file: ', error)
            );
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
        () => {
        },
        (error) => console.error('Error deleting stored file', storagePath, error)
      );

    // Delete references
    this.afDb.object(referencePath).remove();
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
        this.uploadImmediately = false;
      }
    }
  }

  handleSelectFileClick(event, uploadImmediately = false) {
    this.uploadImmediately = uploadImmediately;
    this.fileInput.nativeElement.click();
    return false;
  }

  handleUploadFileClick() {
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
