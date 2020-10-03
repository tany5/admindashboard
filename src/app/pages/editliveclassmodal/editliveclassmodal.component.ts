import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EditliveclassmodaService } from './editliveclassmoda.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as moment from 'moment';
@Component({
  selector: 'app-editliveclassmodal',
  templateUrl: './editliveclassmodal.component.html',
  styleUrls: ['./editliveclassmodal.component.scss']
})
export class EditliveclassmodalComponent implements OnInit {
  videoId
  videoDetails: any = []
  showDetails: boolean = false



  liveClassList: any = []
  liveClassData: any = []
  subjectLists: any = []
  chapterList: any = []
  images = [];
  videos = [];
  videoDetailsFormGroup: FormGroup;
  

  showLiveCLassData: boolean = false
  displayedColumns: string[] = ['id', 'live_class_title', 'action'];  
  date1: string = ''
  isLinear: boolean = true
  live_class_meta_id: any
  product_id: any
  dayId
  progress: number = 0;
  format;
  url2
  bannerChange: any = 0
  videoChnage: any = 0
  pdfChnage: any = 0

  src
  time: any;
  date: any;
  subject: any;
  chapter: any;
  title: any;
  order: any;
  url: any;



  constructor(private editService:EditliveclassmodaService, private dialogRef: MatDialogRef<EditliveclassmodalComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private _formBuilder: FormBuilder, private router: Router) { 
    this.videoId = data.video_id
    this.editService.getLiveClassByVideoId(this.videoId).subscribe(
      (res)=> {
        this.showDetails = true
        console.log(res)
        this.videoDetails = res
        var subChar= ''
        this.date = this.videoDetails[0].vdo_date
        this.time = this.videoDetails[0].time
        var gettime = this.time.split(":")

        if(gettime[0] <= 12) {
          subChar = " AM"
        }
        else {
          subChar = " PM"
        }

       this.time = gettime[0]+':'+gettime[1]+subChar

        console.log(gettime[0]+''+gettime[1]+''+gettime[2])        
        this.subject = this.videoDetails[0].sub_id        
        this.chapter = this.videoDetails[0].chap_id
        this.title = this.videoDetails[0].vdo_title
        this.url = this.videoDetails[0].youtube_url
        this.order = this.videoDetails[0].vdo_order
        this.images.push('http://localhost/avisionEstore/'+this.videoDetails[0].vdo_banner)       
        this.url2 =  'http://localhost/avisionEstore/'+this.videoDetails[0].vdo_url
        this.src = 'http://localhost/avisionEstore/'+this.videoDetails[0].vdo_pdf

        console.log(this.url2)

        this.editService.getChapter(this.subject).subscribe(
          (res) => {
            console.log(res)
            this.chapterList = res
        })




       
      })

      this.editService.getSubject().subscribe(
        (res) => {  
          this.subjectLists = res
        })
  }

  ngOnInit(): void {

    this.videoDetailsFormGroup = this._formBuilder.group({
      date: ['', Validators.required],
      subject: ['', Validators.required],
      chapter: ['', Validators.required],
      title: ['', Validators.required],
      url: [''],
      order: ['', Validators.required],
      file: [''],
      fileSource: [''],
      time: ['', Validators.required],     
      video: [''],
      fileSource1: [''],
      fileSource2: [''],
      pdf: [''],
      banner_chnage: [''],
      video_chnage: [''],
      pdf_chnage: [''],
      video_id:['']
    });
  }


  onVideoChange(event) {
    this.bannerChange = 1
    this.images = []
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);

          this.videoDetailsFormGroup.patchValue({
            fileSource: this.images
          });
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onVideoFileChange(event) {

    this.videoChnage = 1

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
       
        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.videos.push(event.target.result);

          this.videoDetailsFormGroup.patchValue({
            fileSource1: this.videos
          });
        }        
      }
    }



    const file = event.target.files && event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        if(file.type.indexOf('image')> -1){
          this.format = 'image';
        } else if(file.type.indexOf('video')> -1){
          this.format = 'video';
        }
        reader.onload = (event) => {
          this.url2 = (<FileReader>event.target).result;
          this.videoDetailsFormGroup.patchValue({
            fileSource1: this.url2
          });
        }

      }
    }
  }

  onpdfFileChange(event) {
    this.pdfChnage = 1
    const file = event.target.files && event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);        
        reader.onload = (event) => {
          this.src = (<FileReader>event.target).result;
          console.log(this.src)
          this.videoDetailsFormGroup.patchValue({
            fileSource2: this.src
          });
        }

      }
    }

  }




  getChapter(id) {
    this.editService.getChapter(id).subscribe(
      (res) => {
        console.log(res)
        this.chapterList = res
      })
  }


  submit() {
    console.log(this.videoDetailsFormGroup.value);
   

    this.editService.updateLiveCLassData(this.videoDetailsFormGroup.value).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
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
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
          this.dialogRef.close(this.dayId);
      }
    })
  }






  closeDialog() {
    this.dialogRef.close();
   
  }
}
