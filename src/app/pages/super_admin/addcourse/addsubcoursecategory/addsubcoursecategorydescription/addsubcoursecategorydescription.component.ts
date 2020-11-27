import { Component, OnInit } from '@angular/core';
import { AddsubcoursecategorydescriptionService } from './addsubcoursecategorydescription.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addsubcoursecategorydescription',
  templateUrl: './addsubcoursecategorydescription.component.html',
  styleUrls: ['./addsubcoursecategorydescription.component.scss']
})
export class AddsubcoursecategorydescriptionComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  public Editor = ClassicEditor;
  public addQuizQuestion: FormGroup
  public questionAnswer: FormArray;
  prodId: any
  sub_category_name: any
  innerMeta: any = []

  constructor(private service: AddsubcoursecategorydescriptionService, private _formbuilder: FormBuilder, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.addQuizQuestion = this._formbuilder.group({
      questionAnswer: this._formbuilder.array([])
    });


    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
        this.sub_category_name = params['sub_category_name']
      })
    this.service.getPageInnerMeta(this.prodId).subscribe(
      (res) => {

      this.innerMeta = res['inner_meta']
      console.log(this.innerMeta)
      if (this.innerMeta.length == 0) {
        this.innerMeta.push({heading: '', content:'', course_content_id: ''})
        this.answerCount(1)
      }
      else {
        this.answerCount(this.innerMeta.length)
      }
    },
    (error)=> {

      if (this.innerMeta.length == 0) {
        this.innerMeta.push({heading: '', content:'', course_content_id: ''})
        this.answerCount(1)
      }
      else {
        this.answerCount(this.innerMeta.length)
      }

    })



  }

  get questionAnswerControls() {
    return this.addQuizQuestion.get('questionAnswer')['controls'];
  }

  createAddress(): FormGroup {
    return this._formbuilder.group({
      heading: ['', Validators.required],
      content: ['', Validators.required],
      subcourse_id: [''],
      course_content_id: ['']
    });
  }

  ngOnInit(): void {
  }

  answerCount(count: number) {
    this.addQuizQuestion.setControl('questionAnswer', new FormArray([]))
    this.questionAnswer = this.addQuizQuestion.get('questionAnswer') as FormArray;
    for (var i = 1; i <= count; i++) {
      this.questionAnswer.push(this.createAddress());
    }


    for (var i = 1; i < this.questionAnswer.length; i++) {
      this.questionAnswer.value[i].status = 0
    }

  }
  addQuizquestion() {
    console.log(this.addQuizQuestion.value)
    this.service.submitPageInnerMeta(this.addQuizQuestion.value).subscribe(
      (res) => {
        console.log(res)
        if (res['status'] == '200') {
          this.snackBar.open('Page Content Submitted Successfully!!',"Close", {
            duration:2000
          })
          var element = document.getElementById("page-header");
          element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }
      })

  }



  deleteRow(index: number, course_content_id: number) {
    var result = confirm("Are You Sure To Delete") 
    alert(course_content_id)
    if(result) {
      this.service.deletePageInnerMeta(course_content_id).subscribe((res)=> {
        var snackbarRef = this.snackBar.open(res['message'],"Close", {
          duration:2000
        })

        
        
      })
      this.questionAnswer.removeAt(index);

     
    }
    

  }


  addNewRow() {
    this.innerMeta.push({heading: '', content:'', course_content_id: ''})
    this.questionAnswer.push(this.createAddress());
  }

  addNewRowIndex(index: number) {
    this.innerMeta.splice(index + 1,0,{heading: '', content:'', course_content_id: ''})
    this.questionAnswer.insert(index + 1, this._formbuilder.group({
      heading: ['', Validators.required],
      content: ['', Validators.required],
      course_content_id: ['', Validators.required],
    }))
  }

}
