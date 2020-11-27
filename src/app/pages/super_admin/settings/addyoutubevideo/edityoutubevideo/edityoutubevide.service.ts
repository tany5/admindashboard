import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EdityoutubevideService {

  constructor(private webService: WebService) { }

   submitVideoDetails(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`edit_youtube_video`,{value}, headers)    
  }

  getYoutubeVideoById(video_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_youtube_video/${video_id}`, headers)
  }
}
