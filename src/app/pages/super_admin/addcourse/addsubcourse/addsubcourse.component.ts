import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddsubcoursService } from './addsubcours.service'
@Component({
  selector: 'app-addsubcourse',
  templateUrl: './addsubcourse.component.html',
  styleUrls: ['./addsubcourse.component.scss']
})
export class AddsubcourseComponent implements OnInit {
  subCourse: FormGroup
  showLoader: boolean = false
  progress: number = 0
  allCourses: any = []
  dataSource
  allSubCourses
  displayedColumns: string[] = ['id', 'coursename', 'coursedesc', 'courseimg', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: AddsubcoursService , private _formbuilder: FormBuilder, private router: Router ) {

    this.service.getAllSubCourse().subscribe((res)=> {     
      this.allSubCourses = res['all_sub_courses']
      
      this.dataSource = new MatTableDataSource(this.allSubCourses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.service.getAllCourse().subscribe(
      (res)=> {
        console.log(res)
        this.allCourses = res['all_courses']
    })

  }
  ngOnInit(): void {
    this.subCourse = this._formbuilder.group({
      course: ['', Validators.required],
      subcoursename: ['', Validators.required],
      subcoursedesc: ['']     
    })
  }


  submitSubCourseDetails() {
    if(this.subCourse.invalid) {
      alert("Plaese Add All Required Feild.....")
    }
    else {
      console.log(this.subCourse.value)
      this.service.addSubCourse(this.subCourse.value).subscribe((event: HttpEvent<any>) => {
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

  edit_quiz(id) {
    this.router.navigate(['/superadmin/editsubcourse', id])
  }


  

}
