import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddvideocategoryService } from './addvideocategory.service'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-addvideocategory',
  templateUrl: './addvideocategory.component.html',
  styleUrls: ['./addvideocategory.component.scss']
})
export class AddvideocategoryComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  courseLists: any = []
  addVideoCategory: FormGroup


  displayedColumns: string[] = ['id',  'video_category_name', 'video_category_id', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort; 
  dataSource: any;
  allCategory: any = []

  constructor(private service: AddvideocategoryService, private _formbuilder: FormBuilder, private router: Router, private snackbar: MatSnackBar) { 
    this.service.getCourseName().subscribe(
      (res)=> {        
        this.courseLists = res['all_courses']
    })

    this.service.getVideoCategory().subscribe(
      (res)=> {
        console.log(res)
    })

    this.service.getVideoCategory().subscribe((res)=> {     
      this.allCategory = res['all_category']      
      this.dataSource = new MatTableDataSource(this.allCategory  );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  ngOnInit(): void {

    this.addVideoCategory = this._formbuilder.group({
      categorytitle: [''],
      videocourse: ['']
    })
  }

  addVideoproductCategory() {
    if(this.addVideoCategory.invalid){
      alert(" Please add all requird feild")
    }
    else{
      console.log(this.addVideoCategory.value)
      this.service.submitVideoCategory(this.addVideoCategory.value).subscribe((event: HttpEvent<any>) => {
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

  edit_quiz(video_category_id) {
    this.router.navigate(['/superadmin/editvideocategory', video_category_id])
  }


  delete_category(video_category_id, video_category_name) {

    var result = confirm(`Are you sure you want to delete ${video_category_name} ??`)
    if(result) {
      this.service.delete_video_category(video_category_id).subscribe(
        (res)=> {
          console.log(res)
          let snackbarRef = this.snackbar.open(`${video_category_name} Deleted Successfully !!`, "Close", {
            duration: 2000
          })
          snackbarRef.afterDismissed().subscribe(
            ()=> {
              location.reload()            
          })
      })
    }

  }

}
