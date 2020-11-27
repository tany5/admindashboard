import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditparentcategoryService } from './editparentcategory.service'
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-editparentcategory',
  templateUrl: './editparentcategory.component.html',
  styleUrls: ['./editparentcategory.component.scss']
})
export class EditparentcategoryComponent implements OnInit {

  subCourse: FormGroup
  showLoader: boolean = false
  progress: number = 0
  allCourses: any = []
  subCategoryLists: any = []

  displayedColumns: string[] = ['id', 'subcategoryname', 'categoryname', 'coursesname', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fullLengthQuiz: any = []
  dataSource: any;
  prodId: any
  courseDetails: any = []
  categoryName: any
  parent_cat_id: any


  constructor(private _formbuilder: FormBuilder, private service: EditparentcategoryService, private snackbar: MatSnackBar, private route: ActivatedRoute) {
    this.service.getAllCourse().subscribe((res)=> {       
      this.allCourses = res['all_courses'] 
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']       
      })

      this.service.getParentCategoryById(this.prodId).subscribe(
        (res)=> {
          console.log(res)
          this.courseDetails = res['parent_course_details']
          this.categoryName = this.courseDetails[0]['category_name']
          this.parent_cat_id = this.courseDetails[0]['parent_cat_id']
      })

     
     

    


   }

  ngOnInit(): void {
    this.subCourse = this._formbuilder.group({
      parent_category_name: ['', Validators.required],
      parent_cat_id: ['', Validators.required]      
    })

  }

  submitCourseDetails() {
    if(this.subCourse.invalid) {
      alert("Please Add All Required Feilds")
    }
    else {
      console.log(this.subCourse.value)
      this.service.updateParentCategory(this.subCourse.value).subscribe((event: HttpEvent<any>) => {
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
