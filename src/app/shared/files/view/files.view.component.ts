import { Component, OnInit, Input } from '@angular/core';

interface IFile {
  name?: string;
  link?: string;
};

@Component({
  selector: 'app-files-view',
  templateUrl: './files.view.component.html',
  styleUrls: ['./files.view.component.scss']
})
export class FilesViewComponent implements OnInit {

  @Input() files: Array<IFile>;

  constructor() { }

  ngOnInit() {

  }

}
