import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddsubcoursecategoryService } from './addsubcoursecategory.service'
@Component({
  selector: 'app-addsubcoursecategory',
  templateUrl: './addsubcoursecategory.component.html',
  styleUrls: ['./addsubcoursecategory.component.scss']
})
export class AddsubcoursecategoryComponent implements OnInit {
  subCourseCategory: FormGroup
  allCourses: any = []
  parentCategory: any = []
  progress: number = 0
  showLoader: boolean = false
  src: any = "https://via.placeholder.com/300x180?text=Sub Course Category Image"
  allSubCategory: any = []

  displayedColumns: string[] = ['id', 'coursesname', 'subcoursesname', 'categoryname', 'subcategoryname', 'correctmarks', 'negetivemarks', 'subcategoryimage', 'description','action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  dataSource: any;

  constructor(private service: AddsubcoursecategoryService, private _formbuilder: FormBuilder, private router: Router) {

    this.service.getAllSubCourse().subscribe(
      (res) => {
        this.allCourses = res['all_sub_courses']
      })

      this.service.getAllSubCategoryDetails().subscribe((res)=> {     
        this.allSubCategory = res['sub_course_details']      
        this.dataSource = new MatTableDataSource(this.allSubCategory);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      this.service.addSubCourseCategoryDetails(this.subCourseCategory.value).subscribe((event: HttpEvent<any>) => {
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
    this.service.getParentCategory(subcourse).subscribe(
      (res) => {
        console.log(res)
        this.parentCategory = res['parent_category_details']
        console.log(this.parentCategory)
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit_quiz(quiz_id) {  
    this.router.navigate(['superadmin/editsubcoursecategory/', quiz_id])
  }

  delete_sub_course(quiz_id, quiz_name) {   
    alert(quiz_id) 
    var result = confirm(`Are You Sure to Delete ${quiz_name}?`)
    // if(result) {
    //   this.service.deleteParentCategory(quiz_id).subscribe((res)=> {
    //     this.service.getAllParentCourse().subscribe((res)=> {     
    //       this.fullLengthQuiz = res['parent_course_details']      
    //       this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     })
    //     var snackbarRef = this.snackbar.open(`${quiz_name} Deleted Successfully !!`, "close", {
    //       duration: 2000
    //     })
       
    //   })
    // }
  }

  addSubCatDesc(quiz_id, sub_category_name) {
    this.router.navigate(['superadmin/addsubcoursecategorydesc/', quiz_id, sub_category_name])    
  }

}
