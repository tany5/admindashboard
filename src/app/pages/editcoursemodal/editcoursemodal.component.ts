import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditcoursemodaService } from './editcoursemoda.service'
@Component({
  selector: 'app-editcoursemodal',
  templateUrl: './editcoursemodal.component.html',
  styleUrls: ['./editcoursemodal.component.scss']
})
export class EditcoursemodalComponent implements OnInit {
  live_class_meta_id
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

  actualPrice: any;
  courseName: any;
  offerPrice: any;
  productFeature: any;
  productDesc: any;
  fromDate: any;
  toDate: any;
  liveClass: any;
  courses: any;
  mockTests: any;
  pdfNotes: any;
  practiceQuestion: any;
  product_demo_vdo: any;
  language: any;
  fromDate1: any;
  toDate1: any;
  images = []
  bannerChange: number = 0;
  product_id: any;
  asignTeacherList = []
  listTeacher:any = []

  constructor( private dialogRef: MatDialogRef<EditcoursemodalComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private editService: EditcoursemodaService) { 
    this.live_class_meta_id = data.live_class_meta_id
    console.log(this.live_class_meta_id)

    this.editService.getLiveClassByLiveClassMetaId(this.live_class_meta_id).subscribe(
      (res)=> {
        console.log(res)
        this.courseName = res[0]['product_name']
        this.product_id = res[0]['product_id']
        this.actualPrice = res[0]['product_price']
        this.offerPrice = res[0]['product_offer_price']
        this.productFeature = res[0]['feature']
        this.productDesc = res[0]['description']
        this.fromDate1 = res[0]['start_date']
        this.toDate1 = res[0]['to_date']
        this.liveClass = res[0]['live_class']
        this.courses = res[0]['video_course']        
        this.mockTests = res[0]['mock_test']
        this.pdfNotes  = res[0]['pdf_notes']
        this.practiceQuestion = res[0]['practice_question']
        this.product_img = res[0]['product_img']
        this.url2 = 'http://localhost/avisionEstore/'+this.product_img
        this.product_demo_vdo = res[0]['product_demo_vdo']
        this.language = res [0]['product_language']
      })

      this.editService.getTeacherCourseAssign(this.live_class_meta_id).subscribe(
        (res)=> {
          console.log(res)
          this.listTeacher = res
          for(var i =0; i < this.listTeacher.length; i++) {
            this.asignTeacherList.push(this.listTeacher[i]['teacher_id'] )          
          }

          //this.toppings.setValue(this.locSelected);
        })


      this.editService.getCourseName().subscribe(
        (res)=> {       
          this.courseLists = res
          
        })
  
        this.editService.getTeacherDetails().subscribe(
          (res)=> {
            
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
      product_img: [''],
      product_demo_vdo: [''],
      language:  ['',Validators.required],
      fileSource: [''],
      banner_change: ['', Validators.required],
      live_class_meta_id: ['', Validators.required],
      product_id: ['', Validators.required] 
      
    });

    this.secondFormGroup = this._formBuilder.group({
      teacher_id: ['']
    });

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
  }


  closeDialog() {
    this.dialogRef.close();
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

    this.bannerChange = 1
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


  submitLiveCLassDetails() {

    if(this.addLiveClassFormGroup.invalid) {
     
      let message = "* Feilds Are Required"
      let action = "close"
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }
    else {

      console.log(this.addLiveClassFormGroup.value)
     
      
      
    
      this.editService.submitLiveCLassDetails(this.addLiveClassFormGroup.value).subscribe(
        (res)=> {
          
          this.prodId = res['product_id']
        },
        (error)=> {
          console.log(error)
          
        })
    }

  }


  submitTeacher(getTeacher_id) {   
    
    if(!getTeacher_id) {
      let message = "Please Add Teacher"
      let action = "close"
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    }

    else {
      console.log(getTeacher_id)
      this.editService.asignLiveClassTeacher(getTeacher_id, this.product_id).subscribe(
        (res)=> {
          console.log(res)
          this.productDetails = res['product_details']
          this.teacherDetails = res['teacher_details']

          console.log(this.productDetails)
          this.myStepper.next()
        })

    }
  }

}
