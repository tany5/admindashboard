import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsectionService } from './studentsection.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-studentsection',
  templateUrl: './studentsection.component.html',
  styleUrls: ['./studentsection.component.scss']
})
export class StudentsectionComponent implements OnInit {
  progress: number = 0
  showLoader: boolean = false
  displayedColumns: string[] = ['id', 'username', 'useremail', 'userphone', 'password', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any = []
  allStudent: any = []

  constructor(private service: StudentsectionService, private router: Router) {

    this.service.getAllStudent().subscribe((res)=> {    
      console.log(res) 
      this.allStudent = res['student_list']      
      this.dataSource = new MatTableDataSource(this.allStudent);
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

  edit_quiz(id) {
    this.router.navigate(['/superadmin/editstudent', id])
  }

  update_password(id) {
    this.router.navigate(['/superadmin/updatepassword', id])
  }

}
