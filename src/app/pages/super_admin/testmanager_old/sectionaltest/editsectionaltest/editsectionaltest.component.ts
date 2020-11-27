import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditsectionaltestService } from './editsectionaltest.service'
@Component({
  selector: 'app-editsectionaltest',
  templateUrl: './editsectionaltest.component.html',
  styleUrls: ['./editsectionaltest.component.scss']
})
export class EditsectionaltestComponent implements OnInit {
  addQuiz: FormGroup
  displayedColumns: string[] = ['id', 'question', 'directions', 'action'];
  prodId: any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  fullLengthQuiz: any = []
  dataSource: any;
  subCategoryLists: any = []

  courseTypeSectionLists: any = []
  correctMarks: any
  negativeMarks: any
  quizName: any
  progress: number = 0
  quizDetails: any = []
  subCategoryId: any
  sectionId: any
  changable: any
  noQs: any
  duration: any
  remainQuestion: any
  subjectLists: any = []
  subject: any


  constructor(private service: EditsectionaltestService, private route: ActivatedRoute, private _formbuilder: FormBuilder, private router: Router, private snackbar: MatSnackBar) { 
    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
        console.log(this.prodId)
      })


    this.service.getQuizQuestion(this.prodId).subscribe((res) => {
      this.fullLengthQuiz = res['all_full_length_quiz_question']

      this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.service.getSubCategory().subscribe(
      (res) => {
        this.subCategoryLists = res
      })


      this.service.getSubjectName().subscribe(
        (res) => {
          this.subjectLists = res
        })


    this.service.getAllFullLengthQuizById(this.prodId).subscribe(
      (res) => {
        console.log(res)
        this.quizDetails = res['all_full_length_quiz']
        this.quizName = this.quizDetails[0]['quiz_name']
        this.subCategoryId = this.quizDetails[0]['sub_category_id']
        this.sectionId = this.quizDetails[0]['section_id']
        this.changable = this.quizDetails[0]['changable']
        this.correctMarks = this.quizDetails[0]['correct_mark']
        this.negativeMarks = this.quizDetails[0]['negative_mark']
        this.noQs = this.quizDetails[0]['no_of_qs']
        this.duration = this.quizDetails[0]['duration']
        this.remainQuestion = this.quizDetails[0]['remain_question'],
        this.subject = this.quizDetails[0]['course_id']
        this.service.getCourseTypeSection(this.subCategoryId).subscribe(
          (res) => {
            if (res['status'] == "200") {
              this.courseTypeSectionLists = res['sub_course']
            }
          })
      })

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
      chnageable: ['', Validators.required],
      quiz_id: [''],
      subject:['']
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSubCategorySection(subcategory) {    
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
          
          this.courseTypeSectionLists = []
          this.courseTypeSectionLists.push({ "section_id": 0, "section_name": 'No Data Found' })
          this.service.getQuizCountBySubCategory(subcategory).subscribe(
            (res) => {
              var quizInc = parseInt(res['total_quiz'])              
            })
        }

      })
  }

  getSubSection(subcategory, section_id) {

    if (!subcategory) {
      subcategory = this.subCategoryId
    }

    if (section_id > 0) {
     
      const result = this.subCategoryLists.find(x => x.sub_category_id == subcategory)
      const result2 = this.courseTypeSectionLists.find(x => x.section_id == section_id)
      this.service.getQuizCountBySubCourse(subcategory, section_id).subscribe(
        (res) => {
          console.log(res)
          var quizInc = parseInt(res['total_quiz'])          
        })
    }
  }

  addQuizDetails() {
    if (this.addQuiz.invalid) {
      alert("Please Add All the Feilds")
    }
    else {
      console.log(this.addQuiz.value)
      this.service.editFullLengthQuiz(this.addQuiz.value).subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            this.snackbar.open("Please Wait")
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
            let snackbarRef =this.snackbar.open("Quiz Updated Successfully","Close", {
              duration: 2000
            })
            snackbarRef.afterDismissed().subscribe(()=> {
              location.reload()
            })

        }
      })
    }
  }

  editquestion(question_id) {
    alert(question_id)
    this.router.navigate(['/superadmin/editfulllengthtestquestion', question_id])
  }

  deletequestion(question_id, question) {
    alert(question_id)
    var result = confirm(`Are You Sure to Delete ?`)
    if(result) {
      this.service.deleteQuestionByQuestionId(question_id).subscribe((res)=> {
        console.log(res)
        var snackbarRef = this.snackbar.open("Question Deleted Successfully !!", "close", {
          duration: 2000
        })
        snackbarRef.afterDismissed().subscribe(()=> {
          location.reload()
        })
      })
    }
  }

  

}
