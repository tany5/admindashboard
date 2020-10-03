import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddliveclassvideomodalService } from './addliveclassvideomodal.service'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { MatStepper } from '@angular/material/stepper';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-addliveclassvideomodal',
  templateUrl: './addliveclassvideomodal.component.html',
  styleUrls: ['./addliveclassvideomodal.component.scss']
})
export class AddliveclassvideomodalComponent implements OnInit {
  liveClassList: any = []
  liveClassData: any = []
  subjectLists: any = []
  chapterList: any = []
  images = [];
  videos = [];
  videoDetailsFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  showLiveCLassData: boolean = false
  displayedColumns: string[] = ['id', 'live_class_title', 'action'];
  @ViewChild("tabGroup") tab: MatTabGroup;
  @ViewChild('stepper') private myStepper: MatStepper;
  date1: string = ''
  isLinear: boolean = true
  live_class_meta_id: any
  product_id: any
  dayId
  progress: number = 0;
  format;
  url2

  src
  constructor(private modalService: AddliveclassvideomodalService, private dialogRef: MatDialogRef<AddliveclassvideomodalComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private _formBuilder: FormBuilder) { 
    this.dayId = data.dayId;

    this.live_class_meta_id = data.live_class_meta_id
    this.product_id = data.product_id

    this.modalService.getSubject().subscribe(
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
      dayId: ['', Validators.required],
      live_class_meta_id: [''],
      product_id: [''],
      video: [''],
      fileSource1: [''],
      fileSource2: [''],
      pdf: ['']
    });
  }


  // onDate(event) {
  //   console.log(event.value)
  //   console.log(this.tab.selectedIndex)
  //   if (this.tab.selectedIndex == 0) {
  //     this.date1 = event.value
  //   }
  // }

  


  onVideoChange(event) {
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
    this.modalService.getChapter(id).subscribe(
      (res) => {
        console.log(res)
        this.chapterList = res
      }
    )
  }


  submit() {
    console.log(this.videoDetailsFormGroup.value);
   

    this.modalService.submitLiveCLassData(this.videoDetailsFormGroup.value).subscribe((event: HttpEvent<any>) => {
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
