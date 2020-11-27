import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditvideobyproductidService } from './editvideobyproductid.service'
@Component({
  selector: 'app-editvideobyproductid',
  templateUrl: './editvideobyproductid.component.html',
  styleUrls: ['./editvideobyproductid.component.scss']
})
export class EditvideobyproductidComponent implements OnInit {

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

  video_name: any
  parent_subject_id: any
  demo_video: any
  chapter_id: any
  category_id: any
  video_url: any
  thum_image: any
  type_id: any
  checkeddemoVideo: boolean = false

  src2: any = "https://via.placeholder.com/568x360?text= Product thumbnail  image"

  constructor(private service: EditvideobyproductidService, private _formbuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
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

    this.service.getVideosProductDetails(this.product_id).subscribe(
      (res) => {
        console.log(res)

        this.video_name = res['video_details'][0]['video_name']
        this.parent_subject_id = res['video_details'][0]['parent_subject_id']
        this.demo_video = res['video_details'][0]['demo_video']
        
        if(this.demo_video == '1') {
          this.checkeddemoVideo = true
          
        }else {
          this.checkeddemoVideo = false
          
        }
        this.chapter_id = res['video_details'][0]['chapter_id']
        this.category_id = res['video_details'][0]['category_id']
        this.video_url = res['video_details'][0]['video_url']
        if(res['video_details'][0]['video_image'] !='') {
          this.src2 = "http://localhost/avisionEstore/" + res['video_details'][0]['video_image']
        }
        
        this.type_id = res['video_details'][0]['type_id']

        this.service.getVideoChapter(this.type_id).subscribe(
          (res) => {
            this.chapterLists = res['chapter_list']
          })

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
