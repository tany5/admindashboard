import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddquestionbankquestionService } from './addquestionbankquestion.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addquestionbankquestion',
  templateUrl: './addquestionbankquestion.component.html',
  styleUrls: ['./addquestionbankquestion.component.scss']
})
export class AddquestionbankquestionComponent implements OnInit {
  addQuestion: FormGroup
  subjectList: any = []
  chapterLists: any = []
  courseLists: any = []

  public addQuizQuestion: FormGroup
  public questionAnswer: FormArray;

  public Editor = ClassicEditor;
  selValue: number;
  shouldSubmit: boolean = false
  totalQuestionOption: number
  showDirectionFeild: boolean = false
  progress: number = 0
  addedQuestion: any
  dailyQuizId: any
  showAnswersLists: boolean = false
  fullLengthQuiz: any = []
  totalQuestion: any
  remainQuestion: any

  constructor(private _formbuilder: FormBuilder, private service: AddquestionbankquestionService, private snackBar: MatSnackBar) {
    this.service.getSubjectName().subscribe(
      (res) => {
        
        this.subjectList = res
      })

    this.service.getSubCategory().subscribe(
      (res) => {
        this.courseLists = res
        
      })


    this.addQuizQuestion = this._formbuilder.group({
      questionAnswer: this._formbuilder.array([])
    });

  }

  get questionAnswerControls() {
    return this.addQuizQuestion.get('questionAnswer')['controls'];
  }

  ngOnInit(): void {
    this.addQuestion = this._formbuilder.group({
      examtype: ['', Validators.required],
      subject: ['', Validators.required],
      chapter: ['', Validators.required],
      course: ['', Validators.required],
      difficultie: ['', Validators.required]
    })
  }

  selectCity(index): void {
    this.selValue = 1
    this.shouldSubmit = true
   
    for (var i = 0; i < this.questionAnswer.length; i++) {
      if (index != i) {
        this.questionAnswer.value[i].status = 0
      }
    }
    this.questionAnswer.value[index].status = this.selValue
  }


  createAddress(): FormGroup {
    return this._formbuilder.group({
      answer: [''],
      status: [''],
      question_statement: [''],
      ans_desc: [''],
      direction: [''],
      question_statement_hindi: [''],
      direction_hindi: [''],
      answer_hindi: [''],
      ans_desc_hindi: ['']
    });
  }


  addQuestionDetails() {

  }


  getChapter(subject_id) {
    this.service.getChapterName(subject_id).subscribe((res) => {
     
      this.chapterLists = res
    })
  }

  getTopic(chapter) {

  }



  addQuizquestion() {

    if (this.addQuestion.invalid && this.addQuizQuestion.invalid) {
      alert("* Feilds Are Required")
    }
    else {
      this.service.submitQuestionBankQuestionAnswer(this.addQuestion.value, this.addQuizQuestion.value).subscribe((event: HttpEvent<any>) => {
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
            this.questionAnswer.controls.forEach(group => group.get('answer_hindi').reset())
            this.questionAnswer.controls.forEach(group => group.get('status').reset())
            this.questionAnswer.controls.forEach(group => group.get('question_statement').reset())
            this.questionAnswer.controls.forEach(group => group.get('question_statement_hindi').reset())
            this.questionAnswer.controls.forEach(group => group.get('ans_desc').reset())
            this.questionAnswer.controls.forEach(group => group.get('ans_desc_hindi').reset())
            var element = document.getElementById("page-header")
            element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
            this.snackBar.open("Question Added..", "Close", {
              duration: 2000
            })

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
