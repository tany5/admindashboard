import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EditconceptService } from './editconcept.service' 
@Component({
  selector: 'app-editconcept',
  templateUrl: './editconcept.component.html',
  styleUrls: ['./editconcept.component.scss']
})
export class EditconceptComponent implements OnInit {

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
  prodId: any
  concept: FormGroup
  showSubChapter: boolean = false
  conceptDetails: any =[]
  chapter_id
  study_subchapter_id
  parent_subject_id
  chapter_name
  concept_data
  constructor(private service: EditconceptService,  private _formbuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) { 
    this.service.getSubjectName().subscribe(
      (res)=>{        
        this.subJectLists = res
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
        console.log(this.prodId)
      })

    this.service.getAllStudyConceptById(this.prodId).subscribe(
      (res)=>{        
        this.conceptDetails = res['concept_details'][0]
        console.log(this.conceptDetails)
        this.chapter_id = this.conceptDetails['study_chapter_id']
        this.study_subchapter_id = this.conceptDetails['study_subchapter_id']
        this.parent_subject_id = this.conceptDetails['study_subject_id']
        this.chapter_name = this.conceptDetails['study_pdf_concept_name']
        this.concept_data = this.conceptDetails['concept_data']  
        
        this.service.getChapterName(this.parent_subject_id).subscribe(
          (res)=>{
            console.log(res)
            this.chaptertLists = res
        })
    
        this.service.getSubChapterName(this.chapter_id, this.parent_subject_id).subscribe(
          (res)=>{
            console.log(res)
            this.subChapter = res
            if(this.subChapter.length > 0) {
              this.showSubChapter = true
              this.subChapterLists = this.subChapter
            }
        })
    })

    
    
  }

  ngOnInit(): void {
    this.concept = this._formbuilder.group({
      subject: ['', Validators.required],
      chapter: ['', Validators.required],
      conceptname: ['', Validators.required],
      concept_details: ['', Validators.required],
      subchapter: [''],
      study_concept_id:['']
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


}
