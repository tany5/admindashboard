import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FulllengthtestService } from './fulllengthtest.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-fulllengthtest',
  templateUrl: './fulllengthtest.component.html',
  styleUrls: ['./fulllengthtest.component.scss']
})
export class FulllengthtestComponent implements OnInit {

  displayedColumns: string[] = ['id', 'quiz_name', 'sub_category_name', 'section_name',  'correct_mark', 'negative_mark',  'no_of_qs', 'added_question', 'remain_question', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

 


  fullLengthQuiz: any = []
  dataSource: any;


  constructor(private service: FulllengthtestService, private router: Router, private snackbar: MatSnackBar, private renderer: Renderer2) { 

    this.service.getFullLengthQuiz().subscribe((res)=> {     
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
    this.router.navigate(['superadmin/editfulllengthtest/', quiz_id])
  }

  delete_quiz(quiz_id, quiz_name) {
    
    var result = confirm(`Are You Sure to Delete ${quiz_name}?`)
    if(result) {
      this.service.deletequiz(quiz_id).subscribe((res)=> {
        this.service.getFullLengthQuiz().subscribe((res)=> {     
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

  quizDoubleClick(quiz_id, quiz_name) {     
    var element = document.getElementById(quiz_id)   
    const button = this.renderer.createElement('input');
    
    this.renderer.setProperty(button, 'type', "text")
    this.renderer.setProperty(button, 'id', `quiz${quiz_id}`)    
    this.renderer.setAttribute(button, 'class', "form-control"); 
    this.renderer.setAttribute(button, 'value', quiz_name)   
    this.renderer.listen(button, 'focusout', (event) => {
      this.focusOutFunction(quiz_id);
    })
    element.innerHTML = " "
    // document.getElementById(quiz_id).innerHTML=s;
    this.renderer.appendChild(element, button);
  }

  focusOutFunction(quiz_id){

  //   var element = document.getElementById(`quiz${quiz_id}`).value
  //  console.log(element.tagName)

    // this.service.updateQuizName(quiz_id,quiz_name).subscribe(
    //   (res)=> {
    //   console.log(res)
    // })    
  }

}
