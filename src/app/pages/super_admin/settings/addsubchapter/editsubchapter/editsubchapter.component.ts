import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditsubchapteService } from './editsubchapte.service'

@Component({
  selector: 'app-editsubchapter',
  templateUrl: './editsubchapter.component.html',
  styleUrls: ['./editsubchapter.component.scss']
})
export class EditsubchapterComponent implements OnInit {

  showLoader: boolean = false
  progress: number  = 0
  addProductCategory: FormGroup
  subjectLists: any []  
  chapter: FormGroup
  showReoderDiv: boolean = false
  chapterLists: any = []
  subChapterLists: any = []
  product_id: any
  type_id: any
  chapter_id: any
  sub_chapter_name: any


  constructor(private _formbuilder: FormBuilder, private service: EditsubchapteService, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute  ) { 
    this.service.getQuestionType().subscribe(
      (res)=> {        
        this.subjectLists = res['all_question_type']
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.product_id = params['prodId']
      })

      this.service.getSubChapterById(this.product_id).subscribe(
        (res)=> { 
          console.log(res)       
          this.subChapterLists = res
          this.type_id = res[0]['type_id']         
          this.chapter_id = res[0]['chapter_id']
          this.sub_chapter_name = res[0]['sub_chapter_name']

          this.service.getAllChapterById(this.type_id).subscribe(
            (res)=> {        
              this.chapterLists = res['chapter_details']
          })

      })
  }

  ngOnInit(): void {
    this.addProductCategory = this._formbuilder.group({
      sub_chapter_name: ['', Validators.required],
      videosubject: ['', Validators.required],
      chapter: ['', Validators.required],
      product_id: ['', Validators.required]
    })
  }

  addSubchapter() {
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

            setTimeout(() => {
              this.progress = 0;
              this.showLoader = false
              this.router.navigate(['superadmin/addsubchapter'])
            }, 1500);

        }
      })
    }
  }

  onSubjectSelect(videosubject) {
    this.service.getAllChapterById(videosubject).subscribe(
      (res)=> {        
        this.chapterLists = res['chapter_details']
        console.log(this.chapterLists)
    })
  }

}
