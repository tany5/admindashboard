import { Component, OnInit, ViewChild } from '@angular/core';
import { AddsmallquizcategoryService } from './addsmallquizcategory.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditsmallquizcategoryComponent } from './editsmallquizcategory/editsmallquizcategory.component';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-addsmallquizcategory',
  templateUrl: './addsmallquizcategory.component.html',
  styleUrls: ['./addsmallquizcategory.component.scss']
})
export class AddsmallquizcategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'chaptername', 'action'];
  dataSource;
  questionTypeLists: any = []
  chapterId: any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  typeName: any;
  url: any;


  constructor(private service: AddsmallquizcategoryService,  private dialog: MatDialog, private sanitizer: DomSanitizer) { 
    this.service.getLiveClassData().subscribe(
      (res)=>{
        console.log(res)
        this.questionTypeLists = res
        this.dataSource = new MatTableDataSource(this.questionTypeLists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/live_chat?v=5qap5aO4i9A&embed_domain=localhost");

  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  submitcatname(catname) {

    if(!catname) {
      alert("Please Add a Category")
      return false
    }
   
    this.service.submitSmallQuizCategory(catname).subscribe((res)=> {
      console.log(res)
      this.questionTypeLists = res
      this.dataSource = new MatTableDataSource(this.questionTypeLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  openDialog(chapterId, typename) {   
    this.chapterId = chapterId
    this.typeName = typename   
    const dialogRef = this.dialog.open(EditsmallquizcategoryComponent, {
      width: '40%',
      disableClose: true,
      height: '40vh',      
      data: { chapterId: this.chapterId, chapterName: this.typeName}
    });

    dialogRef.afterClosed().subscribe(
     (res)=> {
      location.reload()
     }
    )
  }

  deleteCategory(chapterId, typename) { 
    var result = confirm(`Are you sure to delete ${typename}?`)

    if(result) {
      this.service.deleteSmallQuestionType(chapterId).subscribe(
        (res)=>{
          console.log(res)
          this.questionTypeLists = res
          this.dataSource = new MatTableDataSource(this.questionTypeLists);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })         
    }
  }

}
