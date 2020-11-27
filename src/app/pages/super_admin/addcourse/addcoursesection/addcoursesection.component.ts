import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddcoursesectionService } from './addcoursesection.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-addcoursesection',
  templateUrl: './addcoursesection.component.html',
  styleUrls: ['./addcoursesection.component.scss']
})
export class AddcoursesectionComponent implements OnInit {
  subCourseSection: FormGroup
  progress: number = 0
  showLoader: boolean = false
  allSubCategory: any = []

  displayedColumns: string[] = ['id',  'subcateid', 'sectionname', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  dataSource: any;


  constructor(private service: AddcoursesectionService, private _formbuilder: FormBuilder, private router: Router) { 
    this.service.getAllSubCategory().subscribe(
      (res)=> {
        console.log(res)
        this.allSubCategory = res['sub_course_details']
    })

    this.service.getAllSection().subscribe((res)=> {     
      this.allSubCategory = res['section_details']      
      this.dataSource = new MatTableDataSource(this.allSubCategory);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
    this.subCourseSection = this._formbuilder.group({
      subcategory: ['', Validators.required],
      sectionname: ['', Validators.required]   
    })
  }

  submitSubCourseSectionDetails(){
    if(this.subCourseSection.invalid) {
      alert("Please Add All Required Feilds")
    }
    else {
      console.log(this.subCourseSection.value)
      this.service.addSection(this.subCourseSection.value).subscribe((event: HttpEvent<any>) => {
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

  edit_quiz(sub_category_id) {
    this.router.navigate(['/superadmin/editcoursesection', sub_category_id])
  }

}
