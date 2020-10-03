import { Component, OnInit, ViewChild } from '@angular/core';
import { SmallquizService } from './smallquiz.service'
import { async } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



/** Constants used to fill up our data base. */


@Component({
  selector: 'app-smallquiz',
  templateUrl: './smallquiz.component.html',
  styleUrls: ['./smallquiz.component.scss']
})
export class SmallquizComponent implements OnInit {

  displayedColumns: string[] = ['id', 'quizname', 'chaptername', 'action'];
  dataSource;
  quizLists: any = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private smallquizService: SmallquizService) {

    

    // Assign the data to the data source for the table to render
    


    this.smallquizService.getSmallQuiz().subscribe(async res => {
      await console.log(res)
      this.quizLists = res
      this.dataSource = new MatTableDataSource(this.quizLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    });

    

  }

  ngOnInit(): void {
  }


  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}



 
