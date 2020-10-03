import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import{ AddsmallquizchildcategoryService } from './addsmallquizchildcategory.service'
import { EditsmallquizchildcategoryComponent } from './editsmallquizchildcategory/editsmallquizchildcategory.component';

@Component({
  selector: 'app-addsmallquizchildcategory',
  templateUrl: './addsmallquizchildcategory.component.html',
  styleUrls: ['./addsmallquizchildcategory.component.scss']
})
export class AddsmallquizchildcategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'typename', 'chaptername', 'action'];
  dataSource;
  questionTypeLists: any = []
  chapterId: any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  typeName: any;
  url: any;
  parentCategoryLists:any = []
  parent_type_id: any;

  constructor( private dialog: MatDialog, private service: AddsmallquizchildcategoryService) { 
    this.service.getSubCategory().subscribe(
      (res)=>{
        console.log(res)
        this.questionTypeLists = res
        this.dataSource = new MatTableDataSource(this.questionTypeLists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })

      this.service.getParentCategory().subscribe(
        (res)=> {         
          this.parentCategoryLists = res
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


  submitcatname(catname, parentCategory) {

    if(!catname || !parentCategory) {
      alert("Please Add a Sub Category")
      return false
    }
    this.service.addSmallQuizSubCategory(catname, parentCategory).subscribe(
      (res)=> {
        this.service.getSubCategory().subscribe(
          (res)=>{            
            this.questionTypeLists = res
            this.dataSource = new MatTableDataSource(this.questionTypeLists);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
      })    
  }


  openDialog(chapterId, typename, parent_type_id) {   
    this.chapterId = chapterId
    this.typeName = typename  
    this.parent_type_id = parent_type_id 
    const dialogRef = this.dialog.open(EditsmallquizchildcategoryComponent, {
      width: '40%',
      disableClose: true,
      height: '40vh',      
      data: { chapterId: this.chapterId, chapterName: this.typeName, parent_type_id: parent_type_id}
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
          this.questionTypeLists = res
          this.dataSource = new MatTableDataSource(this.questionTypeLists);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })         
    }
  }

}
