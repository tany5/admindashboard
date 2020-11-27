import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EditsubcoursecategorService } from './editsubcoursecategor.service'
@Component({
  selector: 'app-editsubcoursecategory',
  templateUrl: './editsubcoursecategory.component.html',
  styleUrls: ['./editsubcoursecategory.component.scss']
})
export class EditsubcoursecategoryComponent implements OnInit {

  subCourseCategory: FormGroup
  allCourses: any = []
  parentCategory: any = []
  progress: number = 0
  showLoader: boolean = false
  src: any = "https://via.placeholder.com/300x180?text=Sub Course Category Image"
  allSubCategory: any = []
  prodId: any
  categoryname: any
  correctmarks: any
  negetivemarks: any
  subcategoryid: any
  subcategoryimage: any
  parentcatid: any
  subcoursesid: any
  coursesid: any
  subcategoryname: any

  constructor(private service: EditsubcoursecategorService, private _formbuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.service.getAllSubCourse().subscribe(
      (res) => {       
        this.allCourses = res['all_sub_courses']
      })

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
      })

    this.service.getSubCategoryById(this.prodId).subscribe(
      (res) => {
        console.log(res)
        this.categoryname = res['sub_category_details'][0]['category_name']
        this.correctmarks = res['sub_category_details'][0]['correct_marks']
        this.negetivemarks = res['sub_category_details'][0]['negetive_marks']
        this.subcategoryid = res['sub_category_details'][0]['sub_category_id']
        this.subcategoryimage = res['sub_category_details'][0]['sub_category_image']
        this.parentcatid = res['sub_category_details'][0]['parent_cat_id']
        this.subcoursesid = res['sub_category_details'][0]['sub_courses_id']
        this.coursesid = res['sub_category_details'][0]['courses_id']
        this.subcategoryname = res['sub_category_details'][0]['sub_category_name']
        this.src = "https://estore.avision24x7.com/" + res['sub_category_details'][0]['sub_category_image']

        this.service.getParentCategory(this.coursesid).subscribe(
          (res) => {
            this.parentCategory = res['parent_category_details']
          })

      })
  }

  ngOnInit(): void {
    this.subCourseCategory = this._formbuilder.group({
      subcourse: ['', Validators.required],
      parentcategory: ['', Validators.required],
      subcoursename: ['', Validators.required],
      sub_course_category_img: [''],
      correctmark: ['', Validators.required],
      negativemark: ['', Validators.required],
      subcategoryid: ['', Validators.required]
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
          this.subCourseCategory.patchValue({
            sub_course_category_img: this.src
          });
        }

      }
    }
  }

  submitSubCourseCategoryDetails() {
    if (this.subCourseCategory.invalid) {
      alert("Please Add All Required Feilds..")
    }
    else {
      console.log(this.subCourseCategory.value)
      this.service.editSubCourseCategoryDetails(this.subCourseCategory.value).subscribe((event: HttpEvent<any>) => {
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

  getParentCategory(subcourse) {   
    const result = this.allCourses.find(x => x.sub_courses_id == subcourse)    
    this.service.getParentCategory(result['courses_id']).subscribe(
      (res) => {
        this.parentCategory = res['parent_category_details']
      })
  }

}
