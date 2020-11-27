import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddfulllengthtestService } from './addfulllengthtest.service'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-addfulllengthtest',
  templateUrl: './addfulllengthtest.component.html',
  styleUrls: ['./addfulllengthtest.component.scss']
})
export class AddfulllengthtestComponent implements OnInit {
  public Editor = ClassicEditor;
 
  @ViewChild("stepper") myStepper: MatStepper;
  addQuiz: FormGroup
  courseTypeSectionLists: any = []
  subCategoryLists: any = []
  correctMarks: any
  negativeMarks: any
  quizName: any
  progress: number = 0
  dailyQuizId: any = 132
  public addQuizQuestion: FormGroup
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

  isLinear: boolean = false
  quizId: any = 132  
  shouldSubmit: boolean = false
  quizLists: any = []
  showAnswersLists: boolean = false

  displayedColumns: string[] = ['id', 'quizname', 'chaptername', 'action'];
  dataSource;

  totalQuestionOption: number 

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  showDirectionFeild: boolean = false


  constructor(private service: AddfulllengthtestService, private _formbuilder: FormBuilder, private ngZone: NgZone, private router: Router) {
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

  ngOnInit(): void {
    this.addQuiz = this._formbuilder.group({
      subcategory: ['', Validators.required],
      coursesection: [''],
      correctmarks: ['', Validators.required],
      negativemarks: ['', Validators.required],
      quizname: ['', Validators.required],
      noofqs: ['', Validators.required],
      duration: ['', Validators.required],
      chnageable: ['', Validators.required]
    })

   

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
      answer: [''],
      answer_hindi: [''],
      status: [''],
      question_statement: [''],
      question_statement_hindi: [''],
      ans_desc: [''],
      ans_desc_hindi: [''],
      daily_quizId: [''],
      direction: [''],
      direction_hindi: ['']
    });
  }

  getSubCategorySection(subcategory) {
    this.quizName = ""
    const result = this.subCategoryLists.find(x => x.sub_category_id == subcategory)
    this.correctMarks = result.correct_marks
    this.negativeMarks = result.negetive_marks
    console.log(result)
    this.service.getCourseTypeSection(subcategory).subscribe(
      (res) => {
        if (res['status'] == "200") {
          this.courseTypeSectionLists = res['sub_course']
          //this.correctMarks = res['sub_course']
        }

        else {
          this.quizName = ""
          this.courseTypeSectionLists = []
          this.courseTypeSectionLists.push({ "section_id": 0, "section_name": 'No Data Found' })
          this.service.getQuizCountBySubCategory(subcategory).subscribe(
            (res) => {
              var quizInc = parseInt(res['total_quiz'])
              this.quizName = result.sub_category_name + ' TEST- ' + (quizInc + 1)
            })
        }

      })
  }

  getSubSection(subcategory, section_id) {
    if (section_id > 0) {
      this.quizName = ""
      const result = this.subCategoryLists.find(x => x.sub_category_id == subcategory)
      const result2 = this.courseTypeSectionLists.find(x => x.section_id == section_id)      
      this.service.getQuizCountBySubCourse(subcategory, section_id).subscribe(
        (res) => {
          console.log(res)
          var quizInc = parseInt(res['total_quiz'])
          this.quizName = result.sub_category_name + ' ' + result2.section_name + ' TEST - ' + (quizInc + 1)
        })
    }


  }


  addQuizDetails() {
    if (this.addQuiz.invalid) {
      alert("Please Add All the Feilds")
    }
    else {
      console.log(this.addQuiz.value)
      this.service.addFullLengthQuiz(this.addQuiz.value).subscribe((event: HttpEvent<any>) => {
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
    
    // if (this.shouldSubmit) {

    if (this.addQuizQuestion.invalid) {
      alert("Please Add All The Answer Feilds")
    }

    // else if(!answer_descriptions) {
    //   alert("Please Add Answer Descriptions")
    // }

    // else if(!question_statement) {
    //   alert("Please Add Question Statement")
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

            this.questionAnswer.controls.forEach(group => group.get('answer_hindi').reset())
            this.questionAnswer.controls.forEach(group => group.get('question_statement_hindi').reset())
            this.questionAnswer.controls.forEach(group => group.get('ans_desc_hindi').reset())
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

}