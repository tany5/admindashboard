import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EditstudyvideoService } from './editstudyvideo.service'
import {map, startWith} from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-editstudyvideo',
  templateUrl: './editstudyvideo.component.html',
  styleUrls: ['./editstudyvideo.component.scss']
})
export class EditstudyvideoComponent implements OnInit {


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
  prodId: any
  conceptName: any 
  lecture_name
  study_vdo_url
  vdo_src: any

  constructor(private service: EditstudyvideoService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) { 
    this.service.getSubjectName().subscribe(
      (res)=>{        
        this.subJectLists = res
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
        console.log(this.prodId)
      })

      
    this.service.getAllStudyConcept().subscribe((res)=> {
      this.allStudyConcept = res['concept_lists']     
      this.options = this.allStudyConcept        
    })

    this.service.getStudyConceptVideoById(this.prodId).subscribe(
      (res)=> {
        console.log(res)
        this.conceptName =res['video_detials'][0]['study_pdf_concept_name']
        this.lecture_name =res['video_detials'][0]['study_vdo_lecture_name']
        this.study_vdo_url = res['video_detials'][0]['study_vdo_url']
        this.vdo_src = res['video_detials'][0]['vdo_src']
             
    })
  }

  ngOnInit(): void {

    this.concept = this._formbuilder.group({      
      conceptname: ['', Validators.required],
      videotype: ['', Validators.required],
      videourl: ['',  Validators.required],
      study_concept_id:[''],
      videoId: ['',  Validators.required]
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
