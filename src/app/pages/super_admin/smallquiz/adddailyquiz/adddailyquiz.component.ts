import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { AdddailyquizService } from './adddailyquiz.service'
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatStepper } from '@angular/material/stepper';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adddailyquiz',
  templateUrl: './adddailyquiz.component.html',
  styleUrls: ['./adddailyquiz.component.scss']
})

export class AdddailyquizComponent implements OnInit {

  @ViewChild("stepper") myStepper: MatStepper;
  parentCategoryLists: any = [];

  public addDailyQuiz: FormGroup
  public addDailyQuizQuestion: FormGroup
  public questionAnswer: FormArray;
  question_statement: any
  ans_desc: any
  selValue: any = 0
  totalQuestion: any
  addedQuestion
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

  isLinear: boolean = false
  dailyQuizId: any = 6
  progress: number;
  shouldSubmit: boolean = false
  dailyQuizLists: any = []

  displayedColumns: string[] = ['id', 'quizname', 'chaptername', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private service: AdddailyquizService, private _formbuilder: FormBuilder, private ngZone: NgZone, private router: Router) {
    this.service.getParentCategory().subscribe(
      (res) => {
        this.parentCategoryLists = res
      })

    this.addDailyQuizQuestion = this._formbuilder.group({
      questionAnswer: this._formbuilder.array([])
    });

    this.service.getAllDailyQuiz().subscribe((res)=> {     
      this.dailyQuizLists = res
      this.dataSource = new MatTableDataSource(this.dailyQuizLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  get questionAnswerControls() {
    return this.addDailyQuizQuestion.get('questionAnswer')['controls'];
  }

  ngOnInit(): void {

    this.questionAnswer = this.addDailyQuizQuestion.get('questionAnswer') as FormArray;
    for (var i = 0; i <= 3; i++) {
      this.questionAnswer.push(this.createAddress());
    }

    for (var i = 0; i < this.questionAnswer.length; i++) {
      this.questionAnswer.value[i].status = 0
    }

    this.addDailyQuiz = this._formbuilder.group({
      parentCategory: ['', Validators.required],
      quizname: ['', Validators.required],
      totalduration: ['', Validators.required],
      noqs: ['', Validators.required],
    })

    // this.addDailyQuizQuestion = this._formbuilder.group({
    //   question_statement: ['', Validators.required]     
    // })
  }


  selectCity(index): void {
    this.selValue = 1
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
      daily_quizId: ['']
    });
  }

  submitDailyQuiz() {
    if (this.addDailyQuiz.invalid) {
      alert("* Feilds Are Required")
    }

    else {
      console.log(this.addDailyQuiz.value)
      this.service.submitDailyQuiz(this.addDailyQuiz.value).subscribe(
        (event: HttpEvent<any>) => {
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
              console.log('User successfully created!', event.body);
              this.dailyQuizId = event.body

              this.addedQuestion = this.totalQuestion
              this.addDailyQuizQuestion.patchValue({
                dailyQuizId: this.dailyQuizId
              })
              this.myStepper.next();
              setTimeout(() => {
                this.progress = 0;
              }, 1500);

          }
        })
    }
  }

  submitDailyQuizQuestionAnswer() {

    // this.questionAnswer.controls.forEach(group=> console.log(group))
    var question_statement = this.addDailyQuizQuestion.get('questionAnswer')['controls'][0]['controls']['question_statement'].value

    var answer_descriptions = this.addDailyQuizQuestion.get('questionAnswer')['controls'][3]['controls']['ans_desc'].value

    this.questionAnswer.controls.forEach(group => {
      console.log("status",group.value.status)
      if(!group.value.status) {       
        this.shouldSubmit = false
      }

      else {        
        this.shouldSubmit = true
      }
    })



    // if (this.shouldSubmit) {

    if (this.addDailyQuizQuestion.invalid) {
      alert("Please Add All The Answer Feilds")
    }

    else if(!answer_descriptions) {
      alert("Please Add Answer Descriptions")
    }

    else if(!question_statement) {
      alert("Please Add Question Statement")
    }

    else if (!this.shouldSubmit) {
      alert("Please Select Correct Answer")
    }
    else  {

      //this.questionAnswer.controls.forEach(group => console.log(group.value.answer))
      console.log(this.addDailyQuizQuestion.value)
      this.service.submitDailyQuizQuestionAnswer(this.addDailyQuizQuestion.value).subscribe((event: HttpEvent<any>) => {
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
                this.myStepper.selected.completed = true;
                this.myStepper.selected.editable = false;
                this.myStepper.next();
              });
            }
            else {
             
              var target = document.getElementById("totalQuestion");
              target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

              this.addDailyQuizQuestion.patchValue({
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

  goBack() {
    location.reload()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDailyQuiz(daily_quiz_id){
    this.router.navigate(['/superadmin/edit_daily_quiz', daily_quiz_id])
  }

}
