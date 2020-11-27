import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReordertrendingtesService } from './reordertrendingtes.service'
@Component({
  selector: 'app-reordertrendingtest',
  templateUrl: './reordertrendingtest.component.html',
  styleUrls: ['./reordertrendingtest.component.scss']
})
export class ReordertrendingtestComponent implements OnInit {

  showLoader: boolean = false
  progress: number  = 0 
  subjectLists: any []
  chapterLists: any
  chapter: FormGroup
  showReoderDiv: boolean = false

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapterLists, event.previousIndex, event.currentIndex);
    
  }

  constructor(private service: ReordertrendingtesService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar) {
    this.service.getSubCategory().subscribe((res)=> {
      console.log(res)
      this.chapterLists = res['sub_category_details']
    })
   }

  ngOnInit(): void {

    this.chapter = this._formbuilder.group({
      lists: ['']
    })
  }


  submit_reorder() {
    this.chapter.patchValue({
      lists: this.chapterLists
    })
    this.service.submitChapterArray(this.chapter.value).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          this.showLoader = true
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.showLoader = false         
          console.log(event.body)  
          let snackbarRef =  this.snackbar.open("Reorder Successfully Updated", "Close", {
            duration: 2000
          })

          this.showReoderDiv = false

          snackbarRef.afterDismissed().subscribe(()=> {
            location.reload()
          })


          setTimeout(() => {
            this.progress = 0;
          }, 1500);

      }
    })
  }

}
