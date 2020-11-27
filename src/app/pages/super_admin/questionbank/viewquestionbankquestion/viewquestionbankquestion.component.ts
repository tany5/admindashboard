import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ViewquestionbankquestionService } from './viewquestionbankquestion.service'
@Component({
  selector: 'app-viewquestionbankquestion',
  templateUrl: './viewquestionbankquestion.component.html',
  styleUrls: ['./viewquestionbankquestion.component.scss']
})
export class ViewquestionbankquestionComponent implements OnInit {

  displayedColumns: string[] = ['id', 'question_text', 'type_name', 'sub_category_name', 'chapter_name', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort: MatSort;
  fullLengthQuiz: any = []
  dataSource: any;
  
  constructor(private service: ViewquestionbankquestionService, private snackbar: MatSnackBar, private rotuer: Router) {
    this.service.getQuestionBankQuestion().subscribe((res)=> {     
      this.fullLengthQuiz = res['question']      
      this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit_quiz(quiz_id) {
    this.rotuer.navigate(['/superadmin/editquestionbankquestion', quiz_id])
  }

  delete_quiz(quiz_id, quiz_name) {   
    var result = confirm(`Are You sure to Deleted ${quiz_name} ?`)
    if(result) {
      this.service.deleteQuestionBankQuestion(quiz_id).subscribe(
        (res)=> {
          var snackbarRef = this.snackbar.open(`${quiz_name} Deleted Successfully!`,"Close", {
            duration: 2000
          })

          snackbarRef.afterDismissed().subscribe(()=> {
            location.reload()
          })
      })
    }
  }

}
