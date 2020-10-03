import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditsmallquizcategoryService } from './editsmallquizcategory.service'

@Component({
  selector: 'app-editsmallquizcategory',
  templateUrl: './editsmallquizcategory.component.html',
  styleUrls: ['./editsmallquizcategory.component.scss']
})
export class EditsmallquizcategoryComponent implements OnInit {
  chapterId
  chapterName: any;
  constructor(private dialogRef: MatDialogRef<EditsmallquizcategoryComponent>, @Inject(MAT_DIALOG_DATA) private data: any, private service: EditsmallquizcategoryService) { 
    console.log(data.chapterName)
    this.chapterId = data.chapterId
    this.chapterName = data.chapterName
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  editcatname(catname) {    
    this.service.updatetSmallQuizCategory(catname, this.chapterId).subscribe((res)=> {      
      this.dialogRef.close();
    })
  }

}
