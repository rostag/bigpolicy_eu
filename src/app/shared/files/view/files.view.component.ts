import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-files-view',
  templateUrl: './files.view.component.html',
  styleUrls: ['./files.view.component.scss']
})
export class FilesViewComponent implements OnInit {

  @Input() files = [];

  constructor() { }

  ngOnInit() {

  }

}
