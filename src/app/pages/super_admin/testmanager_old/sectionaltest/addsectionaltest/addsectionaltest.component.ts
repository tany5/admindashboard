import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddsectionaltestService } from './addsectionaltest.service'
import { from } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-addsectionaltest',
  templateUrl: './addsectionaltest.component.html',
  styleUrls: ['./addsectionaltest.component.scss']
})
export class AddsectionaltestComponent implements OnInit {
  isLinear: boolean = false
  addQuiz: FormGroup
  public addQuizQuestion: FormGroup
  public questionAnswer: FormArray;

  subjectLists: any = []
  subCategoryLists: any = []
  correctMarks: any
  negativeMarks: any[]
  courseTypeSectionLists: any = []
  quizId: any = 132

  shouldSubmit: boolean = false
  quizLists: any = []
  showAnswersLists: boolean = false

  displayedColumns: string[] = ['id', 'quizname', 'chaptername', 'action'];
  dataSource
  addedQuestion
  totalQuestionOption: number
  selValue: any
  showDirectionFeild: boolean = false
  totalQuestion: any
  dailyQuizId: any = 137

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("stepper") myStepper: MatStepper;
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

  progress: number = 0


  constructor(private service: AddsectionaltestService, private _formbuilder: FormBuilder,  private ngZone: NgZone, private snackbar: MatSnackBar) {
    this.service.getSubjectName().subscribe(
      (res) => {
        this.subjectLists = res
      })

    this.service.getSubCategory().subscribe(
      (res) => {
        this.subCategoryLists = res
      })

    this.addQuizQuestion = this._formbuilder.group({
      questionAnswer: this._formbuilder.array([])
    });
  }

  get questionAnswerControls() {
    return this.addQuizQuestion.get('questionAnswer')['controls'];
  }

  selectCity(index): void {
    this.selValue = 1
    this.shouldSubmit = true
    console.log(this.questionAnswer.length);
    console.log(index)
    for (var i = 0; i < this.questionAnswer.length; i++) {
      if (index != i) {
        this.questionAnswer.value[i].status = 0
      }
    }
    this.questionAnswer.value[index].status = this.selValue
  }

  createAddress(): FormGroup {
    return this._formbuilder.group({
      answer: ['', Validators.required],
      status: [''],
      question_statement: [''],
      ans_desc: [''],
      daily_quizId: [''],
      direction: ['']
    });
  }

  ngOnInit(): void {
    this.addQuiz = this._formbuilder.group({
      subject: ['', Validators.required],
      subcategory: [''],
      coursesection: [''],
      quizname: [''],
      noofqs: [''],
      duration: [''],
      correctmarks: [''],
      negativemarks: ['']

    })
  }


  getSubCategorySection(subcategory) {   
    const result = this.subCategoryLists.find(x => x.sub_category_id == subcategory)
    this.correctMarks = result.correct_marks
    this.negativeMarks = result.negetive_marks
    this.service.getCourseTypeSection(subcategory).subscribe(
      (res) => {
        console.log(res)
        if (res['status'] == "200") {
          this.courseTypeSectionLists = res['sub_course']
          //this.correctMarks = res['sub_course']
        }
        else {
          this.courseTypeSectionLists = []
          this.courseTypeSectionLists.push({ "section_id": 0, "section_name": 'No Data Found' })
        }
      })
  }




  addQuizDetails() {
    if (this.addQuiz.invalid) {
      alert("Please Add All the Feilds")
    }
    else {
      console.log(this.addQuiz.value)
      this.service.addsectionalLengthQuiz(this.addQuiz.value).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log(event.body)
            this.totalQuestion = this.addQuiz.get('noofqs').value  
            this.addedQuestion = this.addQuiz.get('noofqs').value           
            this.dailyQuizId = event.body.quiz_id
            this.myStepper.next();
        }
      })
    }
  }

  addQuizquestion() { 
    var totalqs = this.totalQuestionOption-1    
    var question_statement =  this.questionAnswer.controls[0].value.question_statement
    var answer_descriptions =  this.questionAnswer.controls[totalqs].value.ans_desc
    var direction = this.questionAnswer.controls[0].value.direction
    
    // if (this.shouldSubmit) {

    if (this.addQuizQuestion.invalid) {
      alert("Please Add All The Answer Feilds")
    }

    else if(!answer_descriptions) {
      alert("Please Add Answer Descriptions")
    }

    else if(!question_statement) {
      alert("Please Add Question Statement")
    }

    // else if(this.showDirectionFeild && !direction) {
    //   alert("Please Add Question Direction")
    // }

    else if (!this.shouldSubmit) {
      alert("Please Select Correct Answer")
    }
    else  {

      //this.questionAnswer.controls.forEach(group => console.log(group.value.answer))
      console.log(this.addQuizQuestion.value)
      
      this.service.submitFullLengthQuizQuestionAnswer(this.addQuizQuestion.value).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            this.snackbar.open("Please Wait", "Close")
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:

            this.questionAnswer.controls.forEach(group => group.get('answer').reset())
            this.questionAnswer.controls.forEach(group => group.get('status').reset())
            this.questionAnswer.controls.forEach(group => group.get('question_statement').reset())
            this.questionAnswer.controls.forEach(group => group.get('ans_desc').reset())
            this.addedQuestion = event.body 
            this.snackbar.dismiss()
            this.snackbar.open("question Added", "Close", {
              duration: 2000
            })

            if (this.addedQuestion == '0') {             
              this.ngZone.run(() => {
                this.myStepper.selected.completed = true;
                this.myStepper.selected.editable = false;
                this.myStepper.next();
              });
            }
            else {             
              var target = document.getElementById("page-header");
              target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
              this.addQuizQuestion.patchValue({
                dailyQuizId: this.dailyQuizId
              })
            }


          // setTimeout(() => {
          //   this.progress = 0;
          // }, 1500);

        }
      })
    }

  }

  answerCount(count) {
    this.totalQuestionOption = count
    this.showAnswersLists = true   
    this.addQuizQuestion.setControl('questionAnswer', new FormArray([])) 
    this.questionAnswer = this.addQuizQuestion.get('questionAnswer') as FormArray;
    for (var i = 1; i <= count; i++) {
      this.questionAnswer.push(this.createAddress());
    }

    for (var i = 1; i < this.questionAnswer.length; i++) {
      this.questionAnswer.value[i].status = 0
    }

  }

  showDirection() {
    this.showDirectionFeild = !this.showDirectionFeild 
  }

  goBack(){
    location.reload()
  }

}
