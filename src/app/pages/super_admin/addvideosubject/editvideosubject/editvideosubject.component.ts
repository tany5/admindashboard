import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EditvideosubjecService } from './editvideosubjec.service'
@Component({
  selector: 'app-editvideosubject',
  templateUrl: './editvideosubject.component.html',
  styleUrls: ['./editvideosubject.component.scss']
})
export class EditvideosubjectComponent implements OnInit {

  showLoader: boolean = false
  progress: number = 0
  subject: FormGroup
  prodId: any
  type_name: any
  type_img: any
  src:any ="https://via.placeholder.com/468x160?text=course thumbnail  image"

  constructor(private service: EditvideosubjecService, private _formbuilder: FormBuilder, private route: ActivatedRoute) {

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']       
      })

      this.service.getProductSubjectById(this.prodId).subscribe(
        (res)=> {
          console.log(res)
          this.type_name = res['video_details'][0]['type_name']
          this.type_img = res['video_details'][0]['type_img']
          this.src = "http://localhost/avisionEstore/"+this.type_img
      })
   }

  ngOnInit(): void {
    this.subject = this._formbuilder.group({
      subject_name: [''],
      subject_img: [''],
      product_id:['']
    })
  }

  submitSubjectDetails() {
    console.log(this.subject.value)
    if(this.subject.invalid) {
      alert("Please Add All Requird Feilds...")
    }
    else {
      this.service.addSubject(this.subject.value).subscribe((event: HttpEvent<any>) => {
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


  onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);        
        reader.onload = (event) => {
          this.src = (<FileReader>event.target).result;         
          this.subject.patchValue({
            subject_img: this.src
          });
        }

      }
    }
  }

}
