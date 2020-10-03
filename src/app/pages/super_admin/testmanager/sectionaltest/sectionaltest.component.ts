import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SectionaltestService } from './sectionaltest.service'
@Component({
  selector: 'app-sectionaltest',
  templateUrl: './sectionaltest.component.html',
  styleUrls: ['./sectionaltest.component.scss']
})
export class SectionaltestComponent implements OnInit {

  displayedColumns: string[] = ['id', 'quiz_name', 'sub_category_name', 'section_name',  'correct_mark', 'negative_mark',  'no_of_qs', 'added_question', 'remain_question', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 


  fullLengthQuiz: any = []
  dataSource: any;

  constructor(private service: SectionaltestService, private router: Router, private snackbar: MatSnackBar) { 
    this.service.getSectionalLengthQuiz().subscribe((res)=> {     
      this.fullLengthQuiz = res['all_full_length_quiz']      
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
    this.router.navigate(['superadmin/editsectionaltest/', quiz_id])
  }

  delete_quiz(quiz_id, quiz_name) {
    
    var result = confirm(`Are You Sure to Delete ${quiz_name}?`)
    if(result) {
      this.service.deletequiz(quiz_id).subscribe((res)=> {
        this.service.getSectionalLengthQuiz().subscribe((res)=> {     
          this.fullLengthQuiz = res['all_full_length_quiz']      
          this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
        var snackbarRef = this.snackbar.open(`${quiz_name} Deleted Successfully !!`, "close", {
          duration: 2000
        })
       
      })
    }
  }

}
