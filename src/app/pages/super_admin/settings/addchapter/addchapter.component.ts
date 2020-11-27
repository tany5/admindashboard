import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddchapterService } from './addchapter.service'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addchapter',
  templateUrl: './addchapter.component.html',
  styleUrls: ['./addchapter.component.scss']
})
export class AddchapterComponent implements OnInit {
  showLoader: boolean = false
  progress: number  = 0
  addProductCategory: FormGroup
  subjectLists: any []
  chapterLists: any
  chapter: FormGroup
  showReoderDiv: boolean = false

  displayedColumns: string[] = ['id', 'videochaptername', 'videosubjectname', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  videoChapterList: any =[]

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapterLists, event.previousIndex, event.currentIndex);
    
  }

  constructor(private _formbuilder: FormBuilder, private service: AddchapterService, private snackbar: MatSnackBar, private router: Router) { 
    this.service.getQuestionType().subscribe(
      (res)=> {        
        this.subjectLists = res['all_question_type']
    })


    this.service.getVideoChapter().subscribe(
      (res)=> {        
        this.videoChapterList = res
        this.dataSource = new MatTableDataSource(this.videoChapterList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })


    
  }

  ngOnInit(): void {
    this.addProductCategory = this._formbuilder.group({
      chapter_name: ['', Validators.required],
      videosubject: ['', Validators.required]
    })

    this.chapter = this._formbuilder.group({
      lists: ['']
    })
  }
  
  addchapter() {
    if (this.addProductCategory.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      console.log(this.addProductCategory.value)
     
      this.service.submitchapter(this.addProductCategory.value).subscribe((event: HttpEvent<any>) => {
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

            var target = document.getElementById("page-header");
            target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

            setTimeout(() => {
              this.progress = 0;
              this.showLoader = false
              location.reload()
            }, 1500);

        }
      })
    }
  }


  onSubjectSelect(subject) {
    this.showReoderDiv = true
    this.service.getChapterName(subject).subscribe(
      (res) => {        
        this.chapterLists = res
      })
  }


  submit_reorder() {
    this.chapter.patchValue({
      lists: this.chapterLists
    })
    
    this.service.submitChapterArray(this.chapter.value).subscribe((event: HttpEvent<any>) => {
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
          console.log(event.body)  
          let snackbarRef =  this.snackbar.open("Reorder Successfully Updated", "Close", {
            duration: 2000
          })

          this.showReoderDiv = false

          snackbarRef.afterDismissed().subscribe(()=> {
            location.reload()
          })


          setTimeout(() => {
            this.progress = 0;
          }, 1500);

      }
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit_chapter(chapter_id) {
    this.router.navigate(['/superadmin/editchapter', chapter_id])    
  }

  delete_chapter(chapter_id, chapter_name){

    var result = confirm(`Are you sure you want to delete ${chapter_name} ??`)
    if(result) {
      this.service.deleteChapter(chapter_id).subscribe(
        (res)=> {
          console.log(res)
          let snackbarRef = this.snackbar.open(`${chapter_name} Deleted Successfully !!`, "Close", {
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
