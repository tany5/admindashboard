import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddfulllengthtestquestionService } from './addfulllengthtestquestion.service'
@Component({
  selector: 'app-addfulllengthtestquestion',
  templateUrl: './addfulllengthtestquestion.component.html',
  styleUrls: ['./addfulllengthtestquestion.component.scss']
})
export class AddfulllengthtestquestionComponent implements OnInit {

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

  public addQuizQuestion: FormGroup
  public questionAnswer: FormArray;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selValue: number;
  shouldSubmit: boolean = false
  totalQuestionOption: number
  showDirectionFeild: boolean = false
  progress: number = 0
  addedQuestion: any
  dailyQuizId: any
  showAnswersLists: boolean = false
  fullLengthQuiz: any =[]
  totalQuestion: any
  remainQuestion: any

  constructor(private service: AddfulllengthtestquestionService, private _formbuilder: FormBuilder, private ngZone: NgZone, private router: Router, private route: ActivatedRoute) {

    this.addQuizQuestion = this._formbuilder.group({
      questionAnswer: this._formbuilder.array([])
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.dailyQuizId = params['prodId']
        console.log(this.dailyQuizId)
      })

      this.service.getFullLengthQuiz(this.dailyQuizId).subscribe((res)=> {     
        this.fullLengthQuiz = res['all_full_length_quiz'] 
        console.log(this.fullLengthQuiz) 
        this.totalQuestion =   this.fullLengthQuiz[0]['no_of_qs']
        this.remainQuestion =   this.fullLengthQuiz[0]['remain_question']  
       
      })

  }

  get questionAnswerControls() {
    return this.addQuizQuestion.get('questionAnswer')['controls'];
  }

  ngOnInit(): void {

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


  addQuizquestion() {
    var totalqs = this.totalQuestionOption - 1
    var question_statement = this.questionAnswer.controls[0].value.question_statement
    var answer_descriptions = this.questionAnswer.controls[totalqs].value.ans_desc
    var direction = this.questionAnswer.controls[0].value.direction

    // if (this.shouldSubmit) {

    if (this.addQuizQuestion.invalid) {
      alert("Please Add All The Answer Feilds")
    }

    else if (!answer_descriptions) {
      alert("Please Add Answer Descriptions")
    }

    else if (!question_statement) {
      alert("Please Add Question Statement")
    }

    // else if (this.showDirectionFeild && !direction) {
    //   alert("Please Add Question Direction")
    // }

    else if (!this.shouldSubmit) {
      alert("Please Select Correct Answer")
    }
    else {

      //this.questionAnswer.controls.forEach(group => console.log(group.value.answer))
      console.log(this.addQuizQuestion.value)


      this.service.submitFullLengthQuizQuestionAnswer(this.addQuizQuestion.value).subscribe((event: HttpEvent<any>) => {
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

            this.questionAnswer.controls.forEach(group => group.get('answer').reset())
            this.questionAnswer.controls.forEach(group => group.get('status').reset())
            this.questionAnswer.controls.forEach(group => group.get('question_statement').reset())
            this.questionAnswer.controls.forEach(group => group.get('ans_desc').reset())
            this.addedQuestion = event.body
            alert(this.addedQuestion)
            if (this.addedQuestion == '0') {

              this.ngZone.run(() => {
                alert(this.addedQuestion)
              });
            }
            else {
              var target = document.getElementById("page-header");
              target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
              this.addQuizQuestion.patchValue({
                dailyQuizId: this.dailyQuizId
              })
              this.remainQuestion = this.remainQuestion -1
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

}
