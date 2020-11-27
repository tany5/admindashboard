import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddvideoproductService } from './addvideoproduct.service'
@Component({
  selector: 'app-addvideoproduct',
  templateUrl: './addvideoproduct.component.html',
  styleUrls: ['./addvideoproduct.component.scss']
})
export class AddvideoproductComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  subjectLists: any =[]
  isLinear: boolean = false
  addVideoProduct: FormGroup
  addProductVideo: FormGroup
  courseLists
  videoCategoryLists: any =[]
  videoSubjectLists: any =[]
  chapterLists: any = []
  product_id: any 
  totalVideoCount: number 
  addedVideo: number 
  remainingVideo: number 

  @ViewChild('stepper') private myStepper: MatStepper;

  src: any = "https://via.placeholder.com/568x360?text= Product thumbnail  image"
  src2: any = "https://via.placeholder.com/568x360?text= Product thumbnail  image"

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };



  
  constructor(private _formbuilder: FormBuilder, private service: AddvideoproductService) { 
    this.service.getAllCourses().subscribe(
      (res)=> {       
        this.courseLists = res
    })

    this.service.getVideoCategory().subscribe(
      (res)=> {  
        console.log(res)           
        this.videoCategoryLists = res['all_category']
    })

    this.service.getVideoSubject().subscribe(
      (res)=> {  
        console.log(res)      
        this.videoSubjectLists = res['all_subject']
    })


  } 

  ngOnInit(): void {
    this.addVideoProduct = this._formbuilder.group({
      videotitle: ['', Validators.required],
      videocourse: ['', Validators.required],
      actual_price: ['', Validators.required],
      offer_price: ['', Validators.required],
      video_count: ['', Validators.required],
      video_lang: ['', Validators.required],
      video_validity: ['', Validators.required],
      video_desc: ['', Validators.required],
      video_thumb:['']
    })


    this.addProductVideo = this._formbuilder.group({
      videocategory: ['', Validators.required],
      videosubject: ['', Validators.required],
      videochapter: ['', Validators.required],
      video_name: ['', Validators.required],
      video_thumb:[''],
      video_url:['', Validators.required],
      demo: ['', Validators.required],
      product_id:['', Validators.required]
    })

    
  }

  onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.src = (<FileReader>event.target).result;
          this.addVideoProduct.patchValue({
            video_thumb: this.src
          });
        }

      }
    }
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

  addVideoproductDetails() {
    if(this.addVideoProduct.invalid){
      alert(" Please add all requird feild")
    }
    else{
      console.log(this.addVideoProduct.value)
      this.service.submitVideoData(this.addVideoProduct.value).subscribe((event: HttpEvent<any>) => {
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
            this.showLoader = false
            this.totalVideoCount = this.addVideoProduct.get("video_count").value
            this.product_id = event.body.product_id
            this.myStepper.next()
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
    }
  }

  addVideoproductVideoDetails() {

     if(this.addProductVideo.invalid){
      alert(" Please add all requird feild")
    }
    else{
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
            this.showLoader = false
            this.addProductVideo.get('videocategory').reset()
            this.addProductVideo.get('videosubject').reset()
            this.addProductVideo.get('videochapter').reset()
            this.addProductVideo.get('video_name').reset()
            this.addProductVideo.get('video_thumb').reset()
            this.addProductVideo.get('video_url').reset()
            this.addProductVideo.get('demo').reset()
            this.src2 = "https://via.placeholder.com/568x360?text= Product thumbnail  image"

            this.totalVideoCount = this.addVideoProduct.get("video_count").value
            this.addedVideo = this.addedVideo + 1
            this.remainingVideo = this.remainingVideo - 1 

            var target = document.getElementById("page-header");
            target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
    }

  }


  getVideoChapter(subjectId) {
   

    this.service.getVideoChapter(subjectId).subscribe(
      (res)=> {  
       
        this.chapterLists = res['chapter_list']
    })
  }

}
