import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditparentsubjecService } from './editparentsubjec.service'
@Component({
  selector: 'app-editparentsubject',
  templateUrl: './editparentsubject.component.html',
  styleUrls: ['./editparentsubject.component.scss']
})
export class EditparentsubjectComponent implements OnInit {

  showLoader: boolean = false
  progress: number = 0
  addProductSubject: FormGroup
  product_id: any
  type_name: any
  constructor(private _formbuilder: FormBuilder, private service: EditparentsubjecService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(
      (params: Params) => {
        this.product_id = params['prodId']
      })

      this.service.getAllQuestionTypeById(this.product_id).subscribe(
        (res)=> {
          console.log(res)
          this.type_name = res['all_question_type'][0]['type_name']
      })
  }

  ngOnInit(): void {
    this.addProductSubject = this._formbuilder.group({
      subject_name: ['', Validators.required],
      product_id: ['', Validators.required]     
    })
  }

  addparentsubject() {
    if (this.addProductSubject.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      console.log(this.addProductSubject.value)
      this.service.submitParentSubject(this.addProductSubject.value).subscribe((event: HttpEvent<any>) => {
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
              this.router.navigate(['/superadmin/addparentsubject'])
            }, 1500);

        }
      })
    }

  }

}
