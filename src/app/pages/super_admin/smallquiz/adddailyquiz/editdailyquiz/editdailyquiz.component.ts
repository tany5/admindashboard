import { Component, OnInit, ViewChild } from '@angular/core';
import { EditdailyquizService } from './editdailyquiz.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-editdailyquiz',
  templateUrl: './editdailyquiz.component.html',
  styleUrls: ['./editdailyquiz.component.scss']
})
export class EditdailyquizComponent implements OnInit {
  prodId: any
  public editDailyQuiz: FormGroup
  parentCategoryLists: any = []
  parent_category_id: any = 20
  quiz_name: any
  totalDuration: any
  noOfQuestion: any
  dailyQuizQuestionLists: any = []

  displayedColumns: string[] = ['id', 'question', 'answer', 'action'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  progress: number = 0


  constructor(private service: EditdailyquizService, private route: ActivatedRoute, private _formbuilder: FormBuilder, private router: Router) {
    this.service.getParentCategory().subscribe(
      (res) => {
        this.parentCategoryLists = res
      })

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
      })

    this.service.getAllDailyQuizById(this.prodId).subscribe((res) => {
      this.parent_category_id = res[0]['type_id']
      this.quiz_name = res[0]['daily_quiz_name']
      this.totalDuration = res[0]['duration']
      this.noOfQuestion = res[0]['total_question']
    })

    this.service.getDailyQuizQuestionQuizById(this.prodId).subscribe((res) => {
      this.dailyQuizQuestionLists = res
      this.dataSource = new MatTableDataSource(this.dailyQuizQuestionLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  ngOnInit(): void {

    this.editDailyQuiz = this._formbuilder.group({
      parentCategory: ['', Validators.required],
      quizname: ['', Validators.required],
      totalduration: ['', Validators.required],
      noqs: ['', Validators.required],
      quizId: ['', Validators.required]
    })
  }

  submitDailyQuiz() {    
    if(this.editDailyQuiz.invalid) {
      alert("* Feilds Are Required")
    }
    else {
      console.log(this.editDailyQuiz.value)
      
      this.service.updateDailyQuiz(this.editDailyQuiz.value).subscribe(
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
              setTimeout(() => {
                this.progress = 0;
              }, 1500);

          }
        })
    }
  
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

editQuestion(question_id) {
  this.router.navigate(['/superadmin/edit_daily_quiz_question', question_id])
}

}
