import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EditvideocategorService } from './editvideocategor.service'
@Component({
  selector: 'app-editvideocategory',
  templateUrl: './editvideocategory.component.html',
  styleUrls: ['./editvideocategory.component.scss']
})
export class EditvideocategoryComponent implements OnInit {

  showLoader: boolean = false
  progress: number = 0
  courseLists: any = []
  addVideoCategory: FormGroup
  prodId: any
  categorytitle: any 
  videocourse: any

  constructor(private service: EditvideocategorService, private _formbuilder: FormBuilder, private route: ActivatedRoute) { 
    this.service.getCourseName().subscribe(
      (res)=> {        
        this.courseLists = res['all_courses']
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']       
      })

      this.service.getVideoCategoryById(this.prodId).subscribe(
        (res)=> {        
          // this.courseLists = res['all_courses']
          // this.categoryDetails  = res['']
          console.log(res)
          this.categorytitle = res['all_category'][0]['video_category_name']
          this.videocourse = res['all_category'][0]['course_id']

      })

  }

  ngOnInit(): void {

    this.addVideoCategory = this._formbuilder.group({
      categorytitle: [''],
      videocourse: [''],
      product_id: ['']
    })

  }

  addVideoproductCategory() {
    if(this.addVideoCategory.invalid){
      alert(" Please add all requird feild")
    }
    else{
      console.log(this.addVideoCategory.value)
      this.service.submitVideoCategory(this.addVideoCategory.value).subscribe((event: HttpEvent<any>) => {
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
            location.reload()
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
    }

  }

  

}
