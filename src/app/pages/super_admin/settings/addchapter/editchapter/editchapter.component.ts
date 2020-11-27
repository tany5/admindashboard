import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditchapteService } from './editchapte.service'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-editchapter',
  templateUrl: './editchapter.component.html',
  styleUrls: ['./editchapter.component.scss']
})
export class EditchapterComponent implements OnInit {

  showLoader: boolean = false
  progress: number  = 0
  addProductCategory: FormGroup
  subjectLists: any []
  chapterLists: any 
  product_id: any  
  chapterDetails: any =[]
  parent_subject_id: any
  chapter_name: any

  constructor(private service: EditchapteService, private _formbuilder: FormBuilder, private route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router) { 
    this.service.getQuestionType().subscribe(
      (res)=> {        
        this.subjectLists = res['all_question_type']
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.product_id = params['prodId']
        console.log(this.product_id)
      })

      this.service.getChapterById(this.product_id).subscribe(
        (res)=> {
          console.log(res)        
          this.chapterDetails = res['chapter_details'][0]
          this.parent_subject_id = this.chapterDetails['parent_subject_id']
          console.log(this.parent_subject_id)
          this.chapter_name = this.chapterDetails['chapter_name']
          console.log(this.chapter_name)
      })
  }

  ngOnInit(): void {
    this.addProductCategory = this._formbuilder.group({
      chapter_name: ['', Validators.required],
      videosubject: ['', Validators.required],
      chapter_id: ['', Validators.required]
    })
  }


  addchapter() {
    if (this.addProductCategory.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      console.log(this.addProductCategory.value)
     
      this.service.submitchapter(this.addProductCategory.value).subscribe((event: HttpEvent<any>) => {
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

            var target = document.getElementById("page-header");
            target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
            this.snackbar.open("Chapter Updated Successfully!!", "Close", {
              duration: 2000
            })

            setTimeout(() => {
              this.progress = 0;
              this.showLoader = false
              this.router.navigate(['superadmin/addchapter'])
            }, 1500);

        }
      })
    }
  }

}
