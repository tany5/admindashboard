import { Component, OnInit, ViewChild } from '@angular/core';
import { AddvideochapterService } from './addvideochapter.service'
import { from } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';




/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
@Component({
  selector: 'app-addvideochapter',
  templateUrl: './addvideochapter.component.html',
  styleUrls: ['./addvideochapter.component.scss']
})

export class AddvideochapterComponent implements OnInit {
  subjectLists: any = []
  videoChapterList: any = []
  videoChapter: FormGroup;
  progress: number = 0

  displayedColumns: string[] = ['id', 'videochaptername', 'videosubjectname', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private addvideochapterService: AddvideochapterService, private _formBuilder: FormBuilder, private snackbar: MatSnackBar) {
    this.addvideochapterService.getSubject().subscribe((res) => {
      console.log(res)
      this.subjectLists = res
    })
    // Create 100 users
   

    

    this.addvideochapterService.getVideoChapter().subscribe(
      (res)=> {
        console.log(res)
        this.videoChapterList = res
        this.dataSource = new MatTableDataSource(this.videoChapterList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  ngOnInit(): void {
    this.videoChapter = this._formBuilder.group({
      subjectid: ['', Validators.required],
      title: ['', Validators.required]

    });
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  submitchapter() {
    console.log(this.videoChapter.value)

    if (!this.videoChapter.invalid) {

      this.addvideochapterService.addChapterName(this.videoChapter.value.subjectid, this.videoChapter.value.title).subscribe(
        (res)=> {
          console.log(res)
         let snackbar_ref = this.snackbar.open("Video Class Added", "Close", {
           duration: 1000
         })

         snackbar_ref.afterDismissed().subscribe(()=> {
          location.reload()
         })
          
      })

    }

  }




}



