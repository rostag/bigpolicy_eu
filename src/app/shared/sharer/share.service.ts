import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProject } from '../models';

/**
 * This class provides the ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ShareService {

  private mailApiUrl = environment.api_url + '/api/mail-api/';

  /**
   * Contains the pending request.
   * @type {Observable<IProject[]>}
   */
  private request;

  /**
   * Creates a new ShareService with the injected Http.
   * @param {HttpClient} http - The injected Http.
   * @constructor
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Shares a model
   * @param IProject A Project to share
   */
  share(modelToShare: any): Observable<any> {
    const body: string = encodeURIComponent(JSON.stringify(modelToShare));
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<any>(this.mailApiUrl + 'share', body, {headers: headers});
  }

  /**
   * Takes videoUrl and returns thumbnail images for it
   * Standard YouTube Thumbs:
   * 1: Small (120x90)
   * 2: Small (120x90) (Default)
   * 3: Small (120x90)
   * Default Thumbnail Image: Full-Size (480x360)
   */
  getYouTubeThumbnail(url, thumbType: string) {
    const videoId: string = this.getYouTubeId(url);
    const prefix = 'http://img.youtube.com/vi/';
    const thumbs: any = {
      small1: '/1.jpg',
      small2: '/2.jpg',
      small3: '/3.jpg',
      full: '/0.jpg'
    };
    return videoId !== null
      ? `<a href="${this.getUrl()}" ><img src="${prefix + videoId + thumbs[thumbType]}" /></a>}`
      : '';
  }

  getUrl() {
    return location.href;
  }

  /**
   * Get video Thumbnail by given yotube URL.
   * Supported URL formats:
   http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
   http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
   http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
   http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
   http://www.youtube.com/embed/0zM3nApSvMg?rel=0
   http://www.youtube.com/watch?v=0zM3nApSvMg
   http://youtu.be/0zM3nApSvMg
   @origin: http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
   */
  getYouTubeId(url = ''): string {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  }

}
