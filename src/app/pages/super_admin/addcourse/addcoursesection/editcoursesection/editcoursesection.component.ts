import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditcoursesectionService } from './editcoursesection.service'
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-editcoursesection',
  templateUrl: './editcoursesection.component.html',
  styleUrls: ['./editcoursesection.component.scss']
})
export class EditcoursesectionComponent implements OnInit {
  subCourseSection: FormGroup
  progress: number = 0
  showLoader: boolean = false
  allSubCategory: any = []
  prodId: any
  sectionDetails: any = []
  subCatId: any 
  sectionName: any
  
  constructor(private service: EditcoursesectionService, private _formbuilder: FormBuilder, private route: ActivatedRoute) { 
    this.service.getAllSubCategory().subscribe(
      (res)=> {        
        this.allSubCategory = res['sub_course_details']
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']       
      })

    this.service.getSectionById(this.prodId).subscribe(
      (res)=> {
        console.log(res)
        this.sectionDetails = res['section_details'][0]
        this.subCatId = this.sectionDetails['sub_cate_id']
        this.sectionName = this.sectionDetails['section_name']
    })


  }

  ngOnInit(): void {
    this.subCourseSection = this._formbuilder.group({
      subcategory: ['', Validators.required],
      sectionname: ['', Validators.required],
      sectionid:   ['', Validators.required]   
    })
  }

  submitSubCourseSectionDetails(){
    if(this.subCourseSection.invalid) {
      alert("Please Add All Required Feilds")
    }
    else {
      console.log(this.subCourseSection.value)
      this.service.editSection(this.subCourseSection.value).subscribe((event: HttpEvent<any>) => {
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
