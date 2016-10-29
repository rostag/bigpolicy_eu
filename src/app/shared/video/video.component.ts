import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'bp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})

export class VideoComponent {

  // Unused at the moment, but will be needed for images alt text
  @Input() title: string = '';

  // Main input, a media (video) url
  @Input()
  set videoUrl(url: string) {
    // Set YouTube ID:
    if (url) {
      // FIXME it's being called too many times
      var match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
      this.youTubeId = (match && match[7].length == 11) ? match[7] : null;

      // Set safe media URL, TODO: BP_SECURITY
      this.safeMediaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.youTubeId
          ? 'https://www.youtube.com/embed/' + this.youTubeId
          : null
      );

      // set thumb URL
      this.thumbUrl = this.youTubeId
          ? 'http://img.youtube.com/vi/' + this.youTubeId + '/0.jpg'
          : 'assets/img/project/project-placeholder.png';
    }
  };

  private safeMediaUrl;
  private thumbUrl;
  private youTubeId;

  constructor( private sanitizer: DomSanitizer ) { }
}
