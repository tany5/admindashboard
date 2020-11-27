import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddvideocoursService } from './addvideocours.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}



@Component({
  selector: 'app-addvideocourse',
  templateUrl: './addvideocourse.component.html',
  styleUrls: ['./addvideocourse.component.scss']
})



export class AddvideocourseComponent implements OnInit {

  displayedColumns: string[] = ['id', 'product_name', 'type_name', 'product_price','product_offer_price','action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fullLengthQuiz: any = []


  constructor(private service: AddvideocoursService, private router: Router, private snackbar: MatSnackBar ) { 

    this.service.getVideoProduct().subscribe((res)=> {
      console.log(res)    
      this.fullLengthQuiz = res['video_product_list']      
      this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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
  
  
  edit_quiz(product_id){

    this.router.navigate(['/superadmin/eidtvideocourse', product_id])
    
  }

  delete_quiz(product_id, product_name) {
    var result = confirm(`Are you sure you want to delete ${product_name} ??`)
    if(result) {
      this.service.delete_video_product_by_product_id(product_id).subscribe(
        (res)=> {
          console.log(res)
          let snackbarRef = this.snackbar.open(`${product_name} Deleted Successfully !!`, "Close", {
            duration: 2000
          })
          snackbarRef.afterDismissed().subscribe(
            ()=> {
              location.reload()            
          })
      })
    }
        
  }


}
