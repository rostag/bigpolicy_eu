import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import { ProjectModel } from '../project/project.model';
import { environment } from '../../../environments/environment';

/**
 * This class provides the ProjectList service with methods to get and save projects.
 */
@Injectable()
export class ShareService {

  private mailApiUrl = environment.api_url + '/api/mail-api/';

  /**
   * Contains the pending request.
   * @type {Observable<ProjectModel[]>}
   */
  private request;

  /**
   * Creates a new ShareService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {
  }

  /**
   * Shares a model
   * @param ProjectModel A Project to share
   */
  share(modelToShare: any): Observable<Response> {
    const body: string = encodeURIComponent(JSON.stringify(modelToShare));
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.mailApiUrl + 'share', body, options).map(res => res.json());

    // TODO: Upsert model in DB:
    // model.events.push({'type': 'share'});
  }

  private handleError(error: Response) {
      console.error('Error occured:', error);
      return Observable.throw(error.json().error || 'Server error');
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
      ? '<a href="' + this.getUrl() + '" ><img src="' + prefix + videoId + thumbs[thumbType] + '" /></a>'
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
