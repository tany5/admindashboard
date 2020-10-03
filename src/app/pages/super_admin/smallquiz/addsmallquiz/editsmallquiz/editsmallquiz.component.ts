import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditsmallquizService } from './editsmallquiz.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-editsmallquiz',
  templateUrl: './editsmallquiz.component.html',
  styleUrls: ['./editsmallquiz.component.scss']
})
export class EditsmallquizComponent implements OnInit {
  smallQuizQuestionTypeLists: any = []
  corsesLists: any = []
  smallQuizChapterLists: any  = []
  editSmallQuiz: FormGroup
  prodId: any
  smallQuizData: any = []
  quiz_name: any
  quiz_base: any
  tot_qus: any;
  type_id: any;
  course_id: any;
  child_type_id: any;
  chapter_id: any;
  progress: number = 0
  dataSource: any
  disableSelect = new FormControl(true);
  courseSelect = new FormControl(true);
  questionLists: any = []

  displayedColumns: string[] = ['id', 'question', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private service: EditsmallquizService, private _formBuilder: FormBuilder, private route: ActivatedRoute, private _snackbar: MatSnackBar, private router: Router) { 

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
        console.log(this.prodId)
      })


    this.service.getSmallQuestionType().subscribe((res) => {
      this.smallQuizQuestionTypeLists = res
    })

    this.service.getSubCategory().subscribe((res) => {
      this.corsesLists = res
    })

    this.service.getSmallQuizById(this.prodId).subscribe((res)=> {
      console.log(res)
      this.smallQuizData = res
      this.quiz_name = res[0]['quiz_name']
      this.quiz_base = res[0]['quiz_base']
      this.tot_qus = res[0]['tot_qus']
      this.type_id = res[0]['type_id']
      this.course_id = res[0]['course_id']
      this.child_type_id = res[0]['child_type_id']
      this.chapter_id = res[0]['chapter_id']
      this.service.getSmallQuizChapterByParent_id(this.type_id).subscribe(
        (res) => {  
          this.smallQuizChapterLists = res
        }) 
        
        
        if(this.quiz_base == '1') {
          this.disableSelect = new FormControl(true);
          this.courseSelect = new FormControl(false);
        }
    
        else if(this.quiz_base == '2') {
          this.disableSelect = new FormControl(false);
          this.courseSelect = new FormControl(false);
        }
        else if(this.quiz_base == '3') {
          this.disableSelect = new FormControl(false);
          this.courseSelect = new FormControl(false);
        }
        else {
          this.disableSelect = new FormControl(true);
          this.courseSelect = new FormControl(true);
        }
    })


    this.service.getSmallQuizQuestion(this.prodId).subscribe((res)=> {
      this.questionLists = res     
      console.log(this.questionLists)
      this.dataSource = new MatTableDataSource(this.questionLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })


  }

  ngOnInit(): void {
    this.editSmallQuiz = this._formBuilder.group({
      examType: ['', Validators.required],
      parentCategory: [0],
      childCategory: [0],
      course: [0],
      quizName: ['', Validators.required],
      totalQuestion: ['', Validators.required],
      quizId: ['', Validators.required]
    })
  }

  onParentCategoryChnage(id) {
    this.service.getSmallQuizChapterByParent_id(id).subscribe(
      (res) => {

        this.smallQuizChapterLists = res
      })
  }

  submitSmallQuizData() {
    console.log(this.editSmallQuiz.value) 
    this.service.submitSmallQuiz(this.editSmallQuiz.value).subscribe((event: HttpEvent<any>) => {
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
        let snackbarRef=  this._snackbar.open(`${this.editSmallQuiz.get("quizName").value} has been updated`, "Close", {
          duration: 2000
        })

        snackbarRef.afterDismissed().subscribe(()=> {
          this.router.navigate(['/superadmin/add_small_quiz'])
        })
      }
    })
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editDailyQuiz(question_id) {   
    this.router.navigate(['/superadmin/edit_small_quiz_question', question_id])    
  }

}
