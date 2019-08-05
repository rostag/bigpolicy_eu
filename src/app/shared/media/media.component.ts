import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  @Input() media: any;

  @Input() hasEditPermissions: true;

  get hasVisual() {
    return !!this.media.photo || this.media.videoUrl;
  };

  constructor() { }

  ngOnInit() {
  }

}
