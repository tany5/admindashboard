import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddsubjecService } from './addsubjec.service'
@Component({
  selector: 'app-addsubject',
  templateUrl: './addsubject.component.html',
  styleUrls: ['./addsubject.component.scss']
})
export class AddsubjectComponent implements OnInit {

  showLoader: boolean = false
  progress: number  = 0
  addProductCategory: FormGroup
  subjectLists: any []  
  chapter: FormGroup
  showReoderDiv: boolean = false
  chapterLists: any = []

  displayedColumns: string[] = ['id', 'videochaptername', 'videosubjectname', 'sub_chapter_name', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  videoSubChapterList: any = []
  courses: any =[]
  section: any = []

  constructor(private service: AddsubjecService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router) { 
    this.service.getQuestionType().subscribe(
      (res)=> {        
        this.subjectLists = res['all_question_type']
    })

    this.service.getVideoChapter().subscribe(
      (res)=> {             
        this.videoSubChapterList = res
        this.dataSource = new MatTableDataSource(this.videoSubChapterList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

      this.service.getAllsubcategory().subscribe(
        (res)=> {
          console.log(res)         
          this.courses = res['small_quiz_details']          
      })

  }

  ngOnInit(): void {
    this.addProductCategory = this._formbuilder.group({     
      videosubject: ['', Validators.required],
      chapter: ['', Validators.required],
      section: ['', Validators.required],
      sub_chapter_name: ['', Validators.required]
    })
  }

  addSubchapter() {
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

  onCourseSelect(coursesId) {
    alert(coursesId)
    this.service.getCourseTypeSection(coursesId).subscribe(
      (res)=> {
        console.log(res)        
        this.section = res['sub_course']
        console.log(this.section)
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
    this.router.navigate(['/superadmin/editsubchapter', chapter_id])    
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
