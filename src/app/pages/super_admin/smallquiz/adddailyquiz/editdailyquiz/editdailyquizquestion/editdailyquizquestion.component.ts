import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EditdailyquizquestioService } from './editdailyquizquestio.service'
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editdailyquizquestion',
  templateUrl: './editdailyquizquestion.component.html',
  styleUrls: ['./editdailyquizquestion.component.scss']
})
export class EditdailyquizquestionComponent implements OnInit {
  progress: number = 0
  public addDailyQuizQuestion: FormGroup
  public questionAnswer: FormArray;
  selValue: number;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/img',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  dailyQuizId: any = 5
  addedQuestion: any;
  shouldSubmit: boolean = false;
  questionId: any
  answerLists: any = []
  showArray: boolean = false

  constructor(private _formbuilder: FormBuilder, private service: EditdailyquizquestioService, private route: ActivatedRoute, private snackbar: MatSnackBar) {
    this.addDailyQuizQuestion = this._formbuilder.group({
      questionAnswer: this._formbuilder.array([])
    });

    this.route.params.subscribe(
      (params: Params) => {
        this.questionId = params['prodId']
    })
  }

  get questionAnswerControls() {
    return this.addDailyQuizQuestion.get('questionAnswer')['controls'];
  }

  ngOnInit(): void {

    this.service.getQuestionById(this.questionId).subscribe((res) => {
      this.answerLists = res
      console.log(this.answerLists)
      this.showArray = true

      this.questionAnswer = this.addDailyQuizQuestion.get('questionAnswer') as FormArray;
      for (var i = 0; i <= 3; i++) {
        this.questionAnswer.push(this.createAddress(this.answerLists[i]));
      }

      for (var i = 0; i < this.questionAnswer.length; i++) {
        this.questionAnswer.value[i].status = 0
      }
    })


  }


  createAddress(answerLists): FormGroup {     
    return this._formbuilder.group({
      answer: [answerLists.answers, Validators.required],
      status: [answerLists.answer_stat],
      question_statement: [answerLists.question_statement],
      ans_desc: [answerLists.answer_desc],
      daily_quizId: [answerLists.daily_quiz_id],
      daily_questionId: [answerLists.question_id]
    });
  }

  selectCity(index): void {
    this.selValue = 1    
    for (var i = 0; i < this.questionAnswer.length; i++) {
      if (index != i) {
        this.questionAnswer.value[i].status = 0
      }
    }
    this.questionAnswer.value[index].status = this.selValue
  }

   submitDailyQuizQuestionAnswer() {

    // this.questionAnswer.controls.forEach(group=> console.log(group))
    var question_statement = this.addDailyQuizQuestion.get('questionAnswer')['controls'][0]['controls']['question_statement'].value
    var answer_descriptions = this.addDailyQuizQuestion.get('questionAnswer')['controls'][3]['controls']['ans_desc'].value

    // if (this.shouldSubmit) {

    if (this.addDailyQuizQuestion.invalid) {
      alert("Please Add All The Answer Feilds")
    }

    else if (!answer_descriptions) {
      alert("Please Add Answer Descriptions")
    }

    else if (!question_statement) {
      alert("Please Add Question Statement")
    }

   
    else {

      //this.questionAnswer.controls.forEach(group => console.log(group.value.answer))
      console.log(this.addDailyQuizQuestion.value)
      this.service.submitDailyQuizQuestionAnswer(this.addDailyQuizQuestion.value).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            this.snackbar.open("Please Wait........", "")
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            this.snackbar.dismiss()
            var element = document.getElementById("progress");
            element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
            let snackbar_ref = this.snackbar.open("Question Answer Successfully Updated", "CLose", {
              duration: 2000
            })
            snackbar_ref.afterDismissed().subscribe(()=> {
              this.progress = 0;
             location.reload()
            })
            
        

        }
      })
    }
  }

}
