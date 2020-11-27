import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PostapprovalService } from './postapproval.service'
@Component({
  selector: 'app-postapproval',
  templateUrl: './postapproval.component.html',
  styleUrls: ['./postapproval.component.scss']
})
export class PostapprovalComponent implements OnInit {

  displayedColumns: string[] = ['id', 'qustext', 'qusimg', 'username', 'posttypestatus', 'attachment', 'date', 'time', 'approve', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any = []
  dayDetails: any = []

  constructor(private service: PostapprovalService, private snackbar: MatSnackBar) {
    this.service.getDayQuestions().subscribe((res)=> {    
      console.log(res) 
      this.dayDetails = res['day_details']      
      this.dataSource = new MatTableDataSource(this.dayDetails);
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

  approve_post(qus_id, status, qus_text) { 

    if(status =='0') {
      var result = confirm(`Are You Sure To Reject ${qus_text} ??`)
      this.service.approvePost(qus_id, status).subscribe(
        (res)=> {
         
          var snackbarRef = this.snackbar.open(`${qus_text} Rejected Successfully!!`, "Close", {
            duration: 2000
          })

          snackbarRef.afterDismissed().subscribe(()=> {
            location.reload()
          })
      })  

    }
    else {
      var result = confirm(`Are You Sure To Approve ${qus_text} ??`)
      this.service.approvePost(qus_id, status).subscribe(
        (res)=> {

          var snackbarRef = this.snackbar.open(`${qus_text} Approved Successfully!!`, "Close", {
            duration: 2000
          })

          snackbarRef.afterDismissed().subscribe(()=> {
            location.reload()
          })
      }) 

    }
    
    
  }

  downloadFile(data) {
  //const blob = new Blob([data], { type: 'application/octet-stream' });
  //url= window.URL.createObjectURL(blob);
  window.open(data);
}

}
