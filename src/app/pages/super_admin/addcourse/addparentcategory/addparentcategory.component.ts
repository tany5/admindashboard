import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddparentcategoryService } from './addparentcategory.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addparentcategory',
  templateUrl: './addparentcategory.component.html',
  styleUrls: ['./addparentcategory.component.scss']
})
export class AddparentcategoryComponent implements OnInit {
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



  constructor(private _formbuilder: FormBuilder, private service: AddparentcategoryService, private snackbar: MatSnackBar, private router: Router) {
    this.service.getAllCourse().subscribe((res)=> {       
      this.allCourses = res['all_courses'] 
    })

    this.service.getAllParentCourse().subscribe((res)=> {     
      this.fullLengthQuiz = res['parent_course_details']      
      this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


   }

  ngOnInit(): void {
    this.subCourse = this._formbuilder.group({
      parent_category_name: ['', Validators.required],
      course: ['', Validators.required],
      subCategory:['', Validators.required]
    })

  }

  submitCourseDetails() {
    if(this.subCourse.invalid) {
      alert("Please Add All Required Feilds")
    }
    else {
      console.log(this.subCourse.value)
      this.service.addParentCategory(this.subCourse.value).subscribe((event: HttpEvent<any>) => {
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
  

  getSubcategory(courseId) {
    this.service.getSubCategory(courseId).subscribe((res)=> {
      console.log(res)     
      this.subCategoryLists = res['sub_course_details'] 
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
    alert(quiz_id)
    this.router.navigate(['superadmin/editparentcategory/', quiz_id])
  }

  delete_sub_course(quiz_id, quiz_name) {   
    alert(quiz_id) 
    var result = confirm(`Are You Sure to Delete ${quiz_name}?`)
    if(result) {
      this.service.deleteParentCategory(quiz_id).subscribe((res)=> {
        this.service.getAllParentCourse().subscribe((res)=> {     
          this.fullLengthQuiz = res['parent_course_details']      
          this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
        var snackbarRef = this.snackbar.open(`${quiz_name} Deleted Successfully !!`, "close", {
          duration: 2000
        })
       
      })
    }
  }

}
