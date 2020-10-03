import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddsmallquizService } from './addsmallquiz.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-addsmallquiz',
  templateUrl: './addsmallquiz.component.html',
  styleUrls: ['./addsmallquiz.component.scss']
})
export class AddsmallquizComponent implements OnInit {
  isLinear = true;
  addSmallQuiz: FormGroup
  public addSmallQuizQuestion:FormGroup 
  public questionAnswer: FormArray;
  smallQuizQuestionTypeLists: any = []
  smallQuizChapterLists: any = []
  corsesLists: any = []
  progress: number = 0
  small_quiz_id: any ;
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
  shouldSubmit: boolean = false
  selValue: number = 0
  addedQuestion: any
  totalQuestion: any
  dataSource: any = []
  smallQuizLists: any = []

  displayedColumns: string[] = ['id', 'quizname', 'typename', 'chaptername', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  disableSelect = new FormControl(true);
  courseSelect = new FormControl(true);
  
  @ViewChild('stepper') private myStepper: MatStepper;
  constructor(private service: AddsmallquizService, private _formBuilder: FormBuilder, private ngZone: NgZone, private router: Router, private snackbar: MatSnackBar) {
    
    this.service.getSmallQuestionType().subscribe((res) => {
      this.smallQuizQuestionTypeLists = res
    })

    this.service.getSubCategory().subscribe((res) => {
      this.corsesLists = res
    })

    this.addSmallQuizQuestion = this._formBuilder.group({
      questionAnswer: this._formBuilder.array([])
    });

    this.service.getAllSmallQuiz().subscribe((res)=> {     
      this.smallQuizLists = res
      console.log(this.smallQuizLists)
      this.dataSource = new MatTableDataSource(this.smallQuizLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


  }


  get questionAnswerControls() {
    return this.addSmallQuizQuestion.get('questionAnswer')['controls'];
  }

  ngOnInit(): void {

    this.questionAnswer = this.addSmallQuizQuestion.get('questionAnswer') as FormArray;
    for (var i = 0; i <= 3; i++) {
      this.questionAnswer.push(this.createAddress());
    }

    for (var i = 0; i < this.questionAnswer.length; i++) {
      this.questionAnswer.value[i].status = 0
    }


    this.addSmallQuiz = this._formBuilder.group({
      examType: [0, Validators.required],
      parentCategory: [0],
      childCategory: [0],
      course: [0],
      quizName: ['', Validators.required],
      totalQuestion: ['', Validators.required]
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
    return this._formBuilder.group({
      answer: ['', Validators.required],
      status: ['0'],
      question_statement: [''],
      ans_desc: [''],
      small_quiz_id: ['']
    });
  }

  onParentCategoryChnage(id) {
    this.service.getSmallQuizChapterByParent_id(id).subscribe(
      (res) => {

        this.smallQuizChapterLists = res
      })
  }

  submitSmallQuizData() {
    if (this.addSmallQuiz.invalid) {
      alert("Please Add All the reuird feilds")
    }
    else {
      this.totalQuestion = this.addSmallQuiz.get('totalQuestion').value

      this.service.submitSmallQuiz(this.addSmallQuiz.value).subscribe((event: HttpEvent<any>) => {
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
            this.small_quiz_id = event.body.small_quiz_id            
            this.myStepper.next()
        }
      })
    }
  }

  submitSmallQuizQuestionAnswer() {

    
    // this.questionAnswer.controls.forEach(group=> console.log(group))
    var question_statement = this.addSmallQuizQuestion.get('questionAnswer')['controls'][0]['controls']['question_statement'].value

    var answer_descriptions = this.addSmallQuizQuestion.get('questionAnswer')['controls'][3]['controls']['ans_desc'].value
    



    // if (this.shouldSubmit) {

    if (this.addSmallQuizQuestion.invalid) {
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
    else {

      //this.questionAnswer.controls.forEach(group => console.log(group.value.answer))
      console.log(this.addSmallQuizQuestion.value)
      this.service.submitSmallQuizQuestionAnswer(this.addSmallQuizQuestion.value).subscribe((event: HttpEvent<any>) => {
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

              this.addSmallQuizQuestion.patchValue({
                small_quiz_id: this.small_quiz_id
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

  editDailyQuiz(id) {   
    this.router.navigate(['/superadmin/edit_small_quiz', id])
  }


  onExamTypeChange(examtype) {

    if(examtype == '1') {
      this.disableSelect = new FormControl(true);
      this.courseSelect = new FormControl(false);
    }

    else if(examtype == '2') {
      this.disableSelect = new FormControl(false);
      this.courseSelect = new FormControl(false);
    }
    else if(examtype == '3') {
      this.disableSelect = new FormControl(false);
      this.courseSelect = new FormControl(false);
    }
    else {
      this.disableSelect = new FormControl(true);
      this.courseSelect = new FormControl(true);
    }
    
  }

  deleteSmallQuiz(small_quiz_id, quiz_name) {    
    var result = confirm(`Are you sure to delete ${quiz_name}?`)
    if(result) {
      this.service.deleteSmallQuiz(small_quiz_id).subscribe(
        (res)=> {
         let _snackbarRef=  this.snackbar.open(`${quiz_name}  ${res['message']}`, "Close", {
            duration: 2000
          })
          _snackbarRef.afterDismissed().subscribe(()=> {
            location.reload()
          })
      })      
    }
  }


}
