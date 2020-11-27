import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EdityoutubevideService } from './edityoutubevide.service'
@Component({
  selector: 'app-edityoutubevideo',
  templateUrl: './edityoutubevideo.component.html',
  styleUrls: ['./edityoutubevideo.component.scss']
})
export class EdityoutubevideoComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  addVideo: FormGroup
  video_id: any
  video_name: any
  video_link: any

  constructor(private _formbuilder: FormBuilder, private service: EdityoutubevideService, private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params: Params) => {
        this.video_id = params['prodId'] 
    })

    this.service.getYoutubeVideoById(this.video_id).subscribe(
      (res)=> {
      console.log(res)
      this.video_name = res['video_details'][0]['video_name']
      this.video_link = res['video_details'][0]['video_link']
    })

   }

  ngOnInit(): void {
    this.addVideo = this._formbuilder.group({
      videoname: ['', Validators.required],
      videolink: ['', Validators.required],
      video_id: ['', Validators.required]
    })
  }

  submitVideoDetails() {
    if (this.addVideo.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      this.service.submitVideoDetails(this.addVideo.value).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            this.showLoader = true
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);

            var target = document.getElementById("page-header");
            target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

            setTimeout(() => {
              this.progress = 0;
              this.showLoader = false
              location.reload()
            }, 1500);

        }
      })
    }
  }

}
