import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddcourseService } from './addcourse.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit {
  src:any ="https://via.placeholder.com/468x160?text=course thumbnail  image"
  course: FormGroup
  progress: number = 0
  showLoader: boolean = false


  displayedColumns: string[] = ['id', 'coursename', 'coursedesc', 'courseimg', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fullLengthQuiz: any = []
  dataSource: any;



  constructor(private _formbuilder: FormBuilder, private service: AddcourseService, private snackbar: MatSnackBar, private router: Router) { 
    this.service.getAllCourse().subscribe((res)=> {     
      this.fullLengthQuiz = res['all_courses']      
      this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
    this.course = this._formbuilder.group({
      course_name:['', Validators.required],
      course_desc: [''],
      course_img: ['']
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit_quiz(quiz_id) {
    this.router.navigate(['superadmin/editcourse/', quiz_id])
  }

  delete_course(quiz_id, quiz_name) {
    
    // var result = confirm(`Are You Sure to Delete ${quiz_name}?`)
    // if(result) {
    //   this.service.deletequiz(quiz_id).subscribe((res)=> {
    //     this.service.getSectionalLengthQuiz().subscribe((res)=> {     
    //       this.fullLengthQuiz = res['all_full_length_quiz']      
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
  
  

}
