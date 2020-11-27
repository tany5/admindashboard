import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddconceptService } from './addconcept.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addconcept',
  templateUrl: './addconcept.component.html',
  styleUrls: ['./addconcept.component.scss']
})
export class AddconceptComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  showLoader: boolean = false
  progress: number = 0
  productDetails: any = []
  subJectLists: any = []
  chaptertLists: any = []
  subChapter: any = []
  subChapterLists: any = []

  allStudyConcept: any = []

  concept: FormGroup
  showSubChapter: boolean = false

  displayedColumns: string[] = ['id', 'subjectname', 'chaptername', 'subchaptername', 'conceptname', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any = []
  allStudent: any = []

  constructor(private service: AddconceptService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router) {
    this.service.getSubjectName().subscribe(
      (res)=>{        
        this.subJectLists = res
    })

    this.service.getAllStudyConcept().subscribe((res)=> {    
      console.log(res) 
      this.allStudyConcept = res['concept_lists']      
      this.dataSource = new MatTableDataSource(this.allStudyConcept);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

   }

  ngOnInit(): void {
    this.concept = this._formbuilder.group({
      subject: ['', Validators.required],
      chapter: ['', Validators.required],
      conceptname: ['', Validators.required],
      concept_details: ['', Validators.required],
      subchapter: ['']
    })
  }

  getChapted(subjectId){
    this.showSubChapter = false
    this.service.getChapterName(subjectId).subscribe(
      (res)=>{
        console.log(res)
        this.chaptertLists = res
    })
    
  }

  submitConceptDetails() {
    if(this.concept.invalid){
      alert("Please Add All Requird Feilds..")
    }
    else {
      console.log(this.concept.value)
      this.service.submitStudyConcept(this.concept.value).subscribe((event: HttpEvent<any>) => {
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
            if (event.body.status == '200') {
              let snackbarRef = this.snackbar.open(event.body.message, "close", {
                duration: 2000
              })

              snackbarRef.afterDismissed().subscribe(() => {
                location.reload()
              })
            }
            else {
              let snackbarRef = this.snackbar.open(event.body.message, "close")
              snackbarRef.afterDismissed().subscribe(() => {
                location.reload()
              })
            }
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
    }
  }

  getSubChapter(chapterId, subjectId){
    this.showSubChapter = false
    this.service.getSubChapterName(chapterId, subjectId).subscribe(
      (res)=>{
        console.log(res)
        this.subChapter = res
        if(this.subChapter.length > 0) {
          this.showSubChapter = true
          this.subChapterLists = this.subChapter
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

  edit_quiz(study_concept_id) {    
    this.router.navigate(['/superadmin/editconcept', study_concept_id])
  }

 
}
