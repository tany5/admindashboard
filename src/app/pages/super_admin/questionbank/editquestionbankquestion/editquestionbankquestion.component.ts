import { Component, OnInit } from '@angular/core';
import { EditquestionbankquestionService } from './editquestionbankquestion.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-editquestionbankquestion',
  templateUrl: './editquestionbankquestion.component.html',
  styleUrls: ['./editquestionbankquestion.component.scss']
})
export class EditquestionbankquestionComponent implements OnInit {
  addQuestion: FormGroup
  subjectList: any = []
  chapterLists: any = []
  courseLists: any = []

  public addQuizQuestion: FormGroup
  public questionAnswer: FormArray;

  public Editor = ClassicEditor;
  selValue: number = 0;
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
  questionId: any
  questionAnswerList: any = []
  type_id: any
  chapter_id: any
  sub_category_id: any
  diff_level: number
  question_desc: any
  question_desc_hindi: any
  question_text: any
  question_text_hindi: any
  solution: any
  solution_hindi: any
  answers: any = []
  innerMeta: any = [];


  constructor(private _formbuilder: FormBuilder, private service: EditquestionbankquestionService, private snackBar: MatSnackBar, private route: ActivatedRoute) {

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
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.questionId = params['prodId']
      })

    this.service.getQuestionAnswer(this.questionId).subscribe(
      (res) => {
        console.log(res)

        this.type_id = res['question']['question'][0]['type_id']
        this.chapter_id = res['question']['question'][0]['chapter_id']
        this.sub_category_id = res['question']['question'][0]['sub_category_id']
        this.diff_level = res['question']['question'][0]['diff_level']
        this.question_desc = res['question']['question'][0]['question_desc']
        this.question_desc_hindi = res['question']['question'][0]['question_desc_hindi']
        this.question_text = res['question']['question'][0]['question_text']
        this.question_text_hindi = res['question']['question'][0]['question_text_hindi']
        this.solution = res['question']['question'][0]['solution']
        this.solution_hindi = res['question']['question'][0]['solution_hindi']
        this.answers = res['question']['answers']
        console.log(this.answers)
        this.answerCount(this.answers.length)

        this.service.getChapterName(this.type_id).subscribe((res) => {
          this.chapterLists = res
        })

      })



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
      difficultie: ['', Validators.required],
      question_id: ['']
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
    console.log(this.addQuizQuestion.value)
    


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
            console.log(event.body)
            var element = document.getElementById("page-header")
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
            var snackBarRef = this.snackBar.open("Question Added..", "Close", {
              duration: 2000
            })

            snackBarRef.afterDismissed().subscribe(()=> {
              location.reload()
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


  addNewRow() { 
    this.answers.push({answer: '', status:0, question_statement: '', ans_desc: '', direction: '', question_statement_hindi: '', direction_hindi: '', answer_hindi: '', ans_desc_hindi: ''})
    this.questionAnswer.push(this._formbuilder.group({
      answer: [''],
      status: [0],
      question_statement: [''],
      ans_desc: [''],
      direction: [''],
      question_statement_hindi: [''],
      direction_hindi: [''],
      answer_hindi: [''],
      ans_desc_hindi: ['']
    }));
  }

  

}
