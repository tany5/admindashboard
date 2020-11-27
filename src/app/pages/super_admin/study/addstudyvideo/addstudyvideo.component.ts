import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AddstudyvideoService } from './addstudyvideo.service'
import { ShowvideomodalComponent } from './showvideomodal/showvideomodal.component';

@Component({
  selector: 'app-addstudyvideo',
  templateUrl: './addstudyvideo.component.html',
  styleUrls: ['./addstudyvideo.component.scss']
})
export class AddstudyvideoComponent implements OnInit {
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
  myControl = new FormControl();
  filteredOptions: any;
  options: any = []


  displayedColumns: string[] = ['id', 'subjectname', 'chaptername', 'subchaptername', 'conceptname', 'conceptvideo', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any = []
  allStudent: any = []
  constructor(private service: AddstudyvideoService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router, private dialog: MatDialog) {

    this.service.getSubjectName().subscribe(
      (res)=>{        
        this.subJectLists = res
    })

    this.service.getAllStudyConcept().subscribe((res)=> {
      this.allStudyConcept = res['concept_lists']     
      this.options = this.allStudyConcept  
      
    })

    this.service.getStudyConceptVideo().subscribe((res)=> {
      this.allStudyConcept = res['video_detials']
      this.dataSource = new MatTableDataSource(this.allStudyConcept);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort   
      
    })
   }

  ngOnInit(): void {
    this.concept = this._formbuilder.group({      
      conceptname: ['', Validators.required],
      videotype: ['', Validators.required],
      videourl: ['',  Validators.required],
      study_concept_id:['']
    })

     this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

   private _filter(value) {
    const filterValue = value.toLowerCase(); 
     
    var result =  this.options.filter(option => option['study_pdf_concept_name'].toLowerCase().indexOf(filterValue) === 0);
    return result
  }

  getChapted(subjectId){
    this.showSubChapter = false
    this.service.getChapterName(subjectId).subscribe(
      (res)=>{
        
        this.chaptertLists = res
    })
    
  }

  submitConceptDetails() {
    console.log(this.concept.value)
    if(this.concept.invalid){
      alert("Please Add All Requird Feilds..")
    }
    else {      
      const result = this.options.find(x => x.study_pdf_concept_name == this.myControl.value)     
      this.concept.patchValue({
        study_concept_id: result['study_concept_id']
      })

      
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
    this.router.navigate(['/superadmin/editstudyvideo', study_concept_id])
  }


  

  openvideo(study_vdo_id, study_vdo_lecture_name, study_vdo_code) {
    const dialogRef = this.dialog.open(ShowvideomodalComponent, {     
      disableClose: true,       
      data: { video_id: study_vdo_id, lecture_name: study_vdo_lecture_name, study_vdo_code: study_vdo_code}   
    });   

  }


  delete_video(study_vdo_id, study_vdo_lecture_name) {
    alert(study_vdo_id)
    var result = confirm(`Are You Sure You Want To Delete ${study_vdo_lecture_name} ??`)
    if(result) {
      this.service.deleteStudyConceptVideoById(study_vdo_id).subscribe(
        (res)=> {
         let snackbarRef =  this.snackbar.open(`${study_vdo_lecture_name} Deleted Successfully!!`, "CLOSE", {
           duration: 2000
         })
         snackbarRef.afterDismissed().subscribe(()=> {
           location.reload()
         })
      })
      
    }
  }
  

}
