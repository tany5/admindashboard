import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LivetestService } from './livetest.service' 
@Component({
  selector: 'app-livetest',
  templateUrl: './livetest.component.html',
  styleUrls: ['./livetest.component.scss']
})
export class LivetestComponent implements OnInit {
  progress: number = 0
  showLoader: boolean = false
  productId: any = 42
  quizLists: any = []


  displayedColumns: string[] = ['id', 'quiz_name', 'sub_category_name', 'no_of_qs', 'correct_mark','negative_mark', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  quizDetails: any = []
  dataSource: any;

  constructor(private service: LivetestService) { 
    this.service.getAllQuizForLiveTest().subscribe(
      (res)=> {
        this.quizDetails = res['all_quiz']  
        console.log(this.quizDetails)    
        this.dataSource = new MatTableDataSource(this.quizDetails);
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


  edit_quiz(quiz_id, status, quiz_name) {  
    var result = confirm(`Are you sure to update live quiz status of ${quiz_name} ??`) 
    if(result) {
      this.service.updateLiveClassStatus(quiz_id, status).subscribe(
        (res)=> {
          location.reload()
      })      
    }
  }

}
