import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'bp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() videoUrl: string = '';
  @Input() title: string = '';

  constructor( private sanitizer: DomSanitizer ) { }

  ngOnInit() { }

  // TODO: BP_SECURITY
  get safeVideoUrl() {
    var videoUrl = this.youTubeId
      ? 'https://www.youtube.com/embed/' + this.youTubeId
      : null;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  get youTubeId() {
    if (!this.videoUrl) {
      return null;
    }
    // FIXME it's being called too many times
    var match = this.videoUrl.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
    return (match && match[7].length == 11) ? match[7] : null;
  }

  get videoThumbUrl() {
    return this.youTubeId
      ? 'http://img.youtube.com/vi/' + this.youTubeId + '/0.jpg'
      : 'assets/img/project/project-placeholder.png';
  }

}
