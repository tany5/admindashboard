import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditsmallquizchildcategoryService } from './editsmallquizchildcategory.service'

@Component({
  selector: 'app-editsmallquizchildcategory',
  templateUrl: './editsmallquizchildcategory.component.html',
  styleUrls: ['./editsmallquizchildcategory.component.scss']
})
export class EditsmallquizchildcategoryComponent implements OnInit {
  parentCategoryLists: any;
  chapterId: any;
  chapterName: any;
  parent_type_id: any
  showparentCategoryLists: boolean = false

  constructor(private dialogRef: MatDialogRef<EditsmallquizchildcategoryComponent>, @Inject(MAT_DIALOG_DATA) private data: any,private service: EditsmallquizchildcategoryService) { 
    console.log(data)
    this.chapterId = data.chapterId
    this.chapterName = data.chapterName
    this.parent_type_id = data.parent_type_id

    console.log(this.chapterId)

    this.service.getParentCategory().subscribe(
      (res)=> {         
        this.parentCategoryLists = res
        this.showparentCategoryLists = true

    })
  }

  ngOnInit(): void {
  }

  submitcatname(catname, parentCategory){
    this.service.updateSmallQuestionSubType(catname, parentCategory, this.chapterId).subscribe(
      (res)=> {
        this.dialogRef.close();
      }
    )    
  } 

  closeDialog() {
    this.dialogRef.close();
  }

}
