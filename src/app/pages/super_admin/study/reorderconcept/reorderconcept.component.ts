import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReorderconcepService } from './reorderconcep.service'
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reorderconcept',
  templateUrl: './reorderconcept.component.html',
  styleUrls: ['./reorderconcept.component.scss']
})
export class ReorderconceptComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  subjectLists: any = []
  chapterLists: any = []

  chapter: FormGroup

  movies = [{
    'movie_name': 'Episode I - The Phantom Menace',
    'id': 0
  }, {
    'movie_name': 'Episode II - The Phantom Menace',
    'id': 1
  }, {
    'movie_name': 'Episode III - Revenge of the Sith',
    'id': 2
  }, {
    'movie_name': 'Episode IV - Revenge of the Sith',
    'id': 3
  }

  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chapterLists, event.previousIndex, event.currentIndex);
    console.log(event.currentIndex)
    console.log(event.previousIndex)
    console.log(this.chapterLists)
  }
  constructor(private service: ReorderconcepService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar) {
    this.service.getSubjectName().subscribe(
      (res) => {
        console.log(res)
        this.subjectLists = res
      })
  }

  ngOnInit(): void {
    this.chapter = this._formbuilder.group({
      lists: ['']
    })
  }

  onSubjectSelect(subject) {
    this.service.getChapterName(subject).subscribe(
      (res) => {
        console.log(res)
        this.chapterLists = res
      })
  }

  submit_reorder() {
    this.chapter.patchValue({
      lists: this.chapterLists
    })
    
    this.service.submitChapter(this.chapter.value).subscribe((event: HttpEvent<any>) => {
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
