import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bp-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent {

  private thumbUrl;
  public youTubeId;
  public safeMediaUrl;

  @Input() title = '';

  @Input() placeholderUrl: string;

  @Input() set videoUrl(url: string) {
    if (url) {
      const match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);
      this.youTubeId = (match && match[7].length === 11) ? match[7] : null;

      // FIXME_SEC Set safe media URL
      this.safeMediaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.youTubeId
          ? `https://www.youtube.com/embed/${this.youTubeId}`
          : null
      );

      // Set thumb URL by video
      this.thumbUrl = this.youTubeId
        ? `http://img.youtube.com/vi/${this.youTubeId}/0.jpg`
        : `assets/img/project/project-placeholder.png`;
    }
  }

  constructor(private sanitizer: DomSanitizer) {
  }
}
