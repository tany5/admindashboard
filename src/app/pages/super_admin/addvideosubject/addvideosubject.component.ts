import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import { AddvideosubjectService } from './addvideosubject.service'
@Component({
  selector: 'app-addvideosubject',
  templateUrl: './addvideosubject.component.html',
  styleUrls: ['./addvideosubject.component.scss']
})
export class AddvideosubjectComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  subject: FormGroup

  src:any ="https://via.placeholder.com/468x160?text=course thumbnail  image"

  displayedColumns: string[] = ['id',  'type_name', 'type_img', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  dataSource: any;
  allSubject: any = []

  constructor(private service: AddvideosubjectService, private _formbuilder: FormBuilder, private router: Router, private snackbar: MatSnackBar) { 

    this.service.getVideoSubject().subscribe((res)=> {     
      this.allSubject = res['all_subject']      
      this.dataSource = new MatTableDataSource(this.allSubject);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  ngOnInit(): void {
    this.subject = this._formbuilder.group({
      subject_name: [''],
      subject_img: ['']
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
          this.subject.patchValue({
            subject_img: this.src
          });
        }

      }
    }
  }

  submitSubjectDetails() {
    console.log(this.subject.value)
    if(this.subject.invalid) {
      alert("Please Add All Requird Feilds...")
    }
    else {
      this.service.addSubject(this.subject.value).subscribe((event: HttpEvent<any>) => {
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

  delete_subject(type_id, type_name) {

    var result = confirm(`Are you sure you want to delete ${type_name} ??`)
    if(result) {
      this.service.delete_video_subject(type_id).subscribe(
        (res)=> {
          console.log(res)
          let snackbarRef = this.snackbar.open(`${type_name} Deleted Successfully !!`, "Close", {
            duration: 2000
          })
          snackbarRef.afterDismissed().subscribe(
            ()=> {
              location.reload()            
          })
      })
    }
    
  }

  edit_quiz(type_id) {   
    this.router.navigate(['/superadmin/editvideosubject', type_id]) 
  }

}
