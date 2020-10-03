import { Component, OnInit, ViewChild } from '@angular/core';
import{ AddsmallquizchapterService } from './addsmallquizchapter.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-addsmallquizchapter',
  templateUrl: './addsmallquizchapter.component.html',
  styleUrls: ['./addsmallquizchapter.component.scss']
})
export class AddsmallquizchapterComponent implements OnInit {
  parentCategoryLists: Object;
  displayedColumns: string[] = ['id', 'parentcategory', 'chilecategory', 'chaptername', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  subCategory: any = []
  showSubCategory: boolean = false
  quizChapter: FormGroup
  smallQuizChapter: any = []
  constructor(private service : AddsmallquizchapterService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar) {
    this.service.getParentCategory().subscribe(
      (res)=> {         
        this.parentCategoryLists = res
    })
    this.service.getSmallQuizChapter().subscribe((res)=> {
      console.log(res)
      this.smallQuizChapter =res    
      this.dataSource = new MatTableDataSource(this.smallQuizChapter)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
   }

  ngOnInit(): void {
    this.quizChapter = this._formbuilder.group({
      parentCategory: ['', Validators.required],
      childCategory: ['0', Validators.required],
      catname: ['', Validators.required]
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


 


  openDialog(chapterId, typename, parent_type_id) {   
    // this.chapterId = chapterId
    // this.typeName = typename  
    // this.parent_type_id = parent_type_id 
    // const dialogRef = this.dialog.open(EditsmallquizchildcategoryComponent, {
    //   width: '40%',
    //   disableClose: true,
    //   height: '40vh',      
    //   data: { chapterId: this.chapterId, chapterName: this.typeName, parent_type_id: parent_type_id}
    // });

    // dialogRef.afterClosed().subscribe(
    //  (res)=> {
    //   location.reload()
    //  }
    // )
  }

  deleteCategory(chapterId, typename) {     
    var result = confirm(`Are you sure to delete ${typename}?`)
    if(result) {
      this.service.deleteSmallChapter(chapterId).subscribe(
        (res)=>{        
          this.service.getSmallQuizChapter().subscribe((res)=> {
            this.smallQuizChapter =res    
            this.dataSource = new MatTableDataSource(this.smallQuizChapter)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        })         
    }
  }

  onParentCategoryChnage(type_id) {
   
    this.service.getChildCategory(type_id).subscribe((res)=> {
      this.subCategory = res
      if(this.subCategory.length > 0) {
        this.showSubCategory = true
      }
      else {
        this.showSubCategory = false
      }
      console.log(this.subCategory)
    })
  }

  submitchapter() {
    console.log(this.quizChapter.value)

    this.service.addSmallQuizChapter(this.quizChapter.value).subscribe(
      (res)=> {
        console.log(res)
        let snackbarRef =  this.snackbar.open(`${this.quizChapter.get("catname").value} Added Successfully`, "CLose", {
          duration: 2000
        })
        snackbarRef.afterDismissed().subscribe((res)=> {
          this.service.getSmallQuizChapter().subscribe((res)=> {
            this.smallQuizChapter =res    
            this.dataSource = new MatTableDataSource(this.smallQuizChapter)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        })
      })
  }

}