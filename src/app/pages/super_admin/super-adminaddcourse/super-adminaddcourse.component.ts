import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperAdminaddcourseService } from './super-adminaddcourse.service'
import * as moment from 'moment';
import { MatStepper } from '@angular/material/stepper';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-super-adminaddcourse',
  templateUrl: './super-adminaddcourse.component.html',
  styleUrls: ['./super-adminaddcourse.component.scss']
})

export class SuperAdminaddcourseComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  teacher_id = new FormControl();
  teacher_name: any


 addCourseFormGroup: FormGroup
 secondFormGroup: FormGroup;
 addLiveClassFormGroup: any;
 isEditable: boolean = false
 isLinear = true;
 url: any = 'https://via.placeholder.com/720x180.png?text=Live Class Banner img'
 url2: any = 'https://via.placeholder.com/720x180.png?text=Live Class Banner img'
 courseLists: any
 product_img: any
 teacherList: any
 prodId: any
 productDetails: any
 teacherDetails: any
 images: any = []
 progress: number

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '15rem',
      minHeight: '5rem',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',     
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/img',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
  firstFormGroup: FormGroup;
 

  constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private addcourseService: SuperAdminaddcourseService) {
    this.addcourseService.getCourseName().subscribe(
      (res)=> {       
        this.courseLists = res
        console.log(this.courseLists)
      })

      this.addcourseService.getTeacherDetails().subscribe(
        (res)=> {
          console.log(res)
          this.teacherList = res['teacher_details']
        }
      )
   }

  ngOnInit(): void {

    this.addLiveClassFormGroup = this._formBuilder.group({
      courseName: ['', Validators.required],
      actualPrice: ['',Validators.required],
      offerPrice: ['',Validators.required],
      productFeature: ['',Validators.required],
      productDesc: ['',Validators.required],
      fromDate: ['',Validators.required],
      toDate: ['',Validators.required],
      courses: ['',Validators.required],
      liveClass: ['',Validators.required],
      mockTests: ['',Validators.required],
      pdfNotes: ['',Validators.required],
      practiceQuestion: ['',Validators.required],
      product_img: ['',Validators.required],
      product_demo_vdo: ['',Validators.required],
      language:  ['',Validators.required],
      fileSource: [''] 
      
    });

    this.secondFormGroup = this._formBuilder.group({
      teacher_id: ['']
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }

  submitLiveCLass() {

    if(this.addLiveClassFormGroup.invalid) {
     
      let message = "* Feilds Are Required"
      let action = "close"
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }
    else {
      this.addcourseService.submitLiveCLassDetails(this.addLiveClassFormGroup.value).subscribe(
        (event: HttpEvent<any>) => {
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
              this.prodId = event.body.product_id
              console.log(this.prodId)
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
             
          }
        })
    }

  }

 


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      let file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.url = event.target.files[0]
      //this.addProductForm.get('product_img').setValue(file);
      const data = this.addLiveClassFormGroup.get('product_img').value
     
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url2 = event.target.result;
      }
    }

    
    this.images = []
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);

          this.addLiveClassFormGroup.patchValue({
            fileSource: this.images
          });
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }



  }


  submitTeacher(getTeacher_id) {   
    this.myStepper.next()
    if(!getTeacher_id) {
      let message = "Please Add Teacher"
      let action = "close"
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }

    else {
      console.log(this.prodId)
      
      this.addcourseService.asignLiveClassTeacher(getTeacher_id, this.prodId).subscribe(
        (event: HttpEvent<any>) => {
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
              
              this.productDetails = event.body.product_details
              this.teacherDetails = event.body.teacher_details
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
             
          }
        })
       
    }
  }

}
