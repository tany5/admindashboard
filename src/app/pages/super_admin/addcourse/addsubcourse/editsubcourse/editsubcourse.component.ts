import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditsubcourseService } from './editsubcourse.service'
import { ActivatedRoute, Params } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-editsubcourse',
  templateUrl: './editsubcourse.component.html',
  styleUrls: ['./editsubcourse.component.scss']
})
export class EditsubcourseComponent implements OnInit {
  subCourse: FormGroup
  showLoader: boolean = false
  progress: number = 0
  allCourses: any = []
  prodId: any
  subCourseDetails: any = []
  courses_id: any
  subcoursename: any
  subcoursedesc: any

  constructor(private service: EditsubcourseService, private _formbuilder: FormBuilder, private route: ActivatedRoute) {
    this.service.getAllCourse().subscribe((res) => {
      this.allCourses = res['all_courses']
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
      })
    this.service.getSubCourseDetails(this.prodId).subscribe(
      (res) => {
        this.subCourseDetails = res['sub_course_details'][0]
        this.courses_id = this.subCourseDetails['courses_id']
        this.subcoursename = this.subCourseDetails['sub_courses_name']
        this.subcoursedesc = this.subCourseDetails['sub_courses_desc']
      })

  }

  ngOnInit(): void {
    this.subCourse = this._formbuilder.group({
      course: ['', Validators.required],
      subcoursename: ['', Validators.required],
      subcoursedesc: [''],
      subcourseid: ['',  Validators.required]
    })
  }




  submitSubCourseDetails() {
    if (this.subCourse.invalid) {
      alert("Plaese Add All Required Feild.....")
    }
    else {
      console.log(this.subCourse.value)
      this.service.editSubCourse(this.subCourse.value).subscribe((event: HttpEvent<any>) => {
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
