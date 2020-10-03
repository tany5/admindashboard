import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditcourseService } from './editcourse.service'
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss']
})
export class EditcourseComponent implements OnInit {
  src:any ="https://via.placeholder.com/468x160?text=course thumbnail  image"
  course: FormGroup
  progress: number = 0
  showLoader: boolean = false
  prodId: any
  courseDetails: any =[]
  courseName: any
  courseDesc: any
  courseImg: any
  showData:boolean = false
  constructor(private _formbuilder: FormBuilder, private service: EditcourseService, private snackbar: MatSnackBar, private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']       
      })

      this.service.getCourseById(this.prodId).subscribe(
        (res)=> {  
          if(res['status']="200"){
            this.courseDetails = res['course_details']        
            this.courseName = this.courseDetails[0]['courses_name']
            this.courseDesc = this.courseDetails[0]['courses_desc']
            this.src = this.courseDetails[0]['course_changed_icon']
            this.showData = true
          }       
          
      })
  }

  ngOnInit(): void {
    this.course = this._formbuilder.group({
      course_name:['', Validators.required],
      course_desc: [''],
      course_img: [''],
      course_id: ['']
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
          this.course.patchValue({
            course_img: this.src
          });
        }

      }
    }
  }

  submitCourseDetails() {
    console.log(this.course.value)
    if(this.course.invalid) {
      alert("Please Add All Requird Feilds...")
    }
    else {
      this.service.addCourse(this.course.value).subscribe((event: HttpEvent<any>) => {
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
            location.reload()
            setTimeout(() => {
              this.progress = 0;
            }, 1500);           
        }
      })
    }
  }


  

}
