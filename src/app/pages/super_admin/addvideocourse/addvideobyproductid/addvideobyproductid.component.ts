import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddvideobyproductidService } from './addvideobyproductid.service'
@Component({
  selector: 'app-addvideobyproductid',
  templateUrl: './addvideobyproductid.component.html',
  styleUrls: ['./addvideobyproductid.component.scss']
})
export class AddvideobyproductidComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  subjectLists: any = []
  isLinear: boolean = false
  addVideoProduct: FormGroup
  addProductVideo: FormGroup
  courseLists
  videoCategoryLists: any = []
  videoSubjectLists: any = []
  chapterLists: any = []
  product_id: any = 44
  totalVideoCount: number = 10
  addedVideo: number = 1
  remainingVideo: number = 9

  src2: any = "https://via.placeholder.com/568x360?text= Product thumbnail  image"


  constructor(private _formbuilder: FormBuilder, private service: AddvideobyproductidService, private route: ActivatedRoute, private router: Router) {
    this.service.getVideoCategory().subscribe(
      (res) => {       
        this.videoCategoryLists = res['all_category']
      })

    this.service.getVideoSubject().subscribe(
      (res) => {       
        this.videoSubjectLists = res['all_subject']
      })

      this.route.params.subscribe(
        (params: Params) => {
          this.product_id = params['prodId']
      })

      this.service.getVideosCountProductId(this.product_id).subscribe(
        (res)=> {
          console.log(res)
          this.totalVideoCount = res['video_product_details'][0]['video_count']
          this.addedVideo = res['video_count']
          this.remainingVideo = this.totalVideoCount - this.addedVideo
          if(this.remainingVideo == 0) {
            this.router.navigate(['/superadmin/eidtvideocourse', this.product_id])
          }
      })
  }

  ngOnInit(): void {
    this.addProductVideo = this._formbuilder.group({
      videocategory: ['', Validators.required],
      videosubject: ['', Validators.required],
      videochapter: [''],
      video_name: ['', Validators.required],
      video_thumb: [''],
      video_url: ['', Validators.required],
      demo: [''],
      product_id: ['', Validators.required]
    })
  }




  onSelectFile2(event) {
    const file = event.target.files && event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.src2 = (<FileReader>event.target).result;
          this.addProductVideo.patchValue({
            video_thumb: this.src2
          });
        }

      }
    }
  }


  addVideoproductVideoDetails() {

    if (this.addProductVideo.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      console.log(this.addProductVideo.value)
      this.service.submitVideoDetails(this.addProductVideo.value).subscribe((event: HttpEvent<any>) => {
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
                        
           
            this.src2 = "https://via.placeholder.com/568x360?text= Product thumbnail  image"

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


  getVideoChapter(subjectId) {
    this.service.getVideoChapter(subjectId).subscribe(
      (res) => {
        this.chapterLists = res['chapter_list']
      })
  }

}
