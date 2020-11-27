import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddyoutubevideoService {

  constructor(private webService: WebService) { }

  submitVideoDetails(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_youtube_video`,{value}, headers)    
  }

  getVideo() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_youtube_video`, headers)
  }

  deleteVideo(video_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_youtube_video/${video_id}`, headers)
  }
}
