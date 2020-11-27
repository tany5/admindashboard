import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EdittestimonialService } from './edittestimonial.service'
@Component({
  selector: 'app-edittestimonial',
  templateUrl: './edittestimonial.component.html',
  styleUrls: ['./edittestimonial.component.scss']
})
export class EdittestimonialComponent implements OnInit {

  showLoader: boolean = false
  progress: number = 0
  addTestimonial: FormGroup
  courseLists: any = []
  productLists: any = []
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  src:any ="https://via.placeholder.com/468x160?text=course thumbnail  image"
  testimonial_id: any
  content: any
  course_id: any
  courses_name: any
  image: any
  product_name: any
  rating: any
  user_name: any
  product_id: any


  constructor(private service: EdittestimonialService, private _formbuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.service.getCourseName().subscribe((res)=> {     
      this.courseLists = res      
    })

    this.route.params.subscribe(
      (params: Params) => {
      this.testimonial_id = params['prodId']
    })

    this.service.getTestimonialData(this.testimonial_id).subscribe(
      (res)=> {     
      this.content = res['testimonial_details'][0]['content']
      this.course_id = res['testimonial_details'][0]['course_id']
      this.product_id = res['testimonial_details'][0]['product_id']
      this.rating = res['testimonial_details'][0]['rating']
      this.user_name = res['testimonial_details'][0]['user_name']
      this.src = "http://localhost/avisionEstore/"+res['testimonial_details'][0]['image']
        
      this.service.getProductName(this.course_id).subscribe(
        (res)=> {         
          this.productLists = res['product']
      }) 

    })
   }

  ngOnInit(): void {
    this.addTestimonial = this._formbuilder.group({
      testimonialcourse: [''],
      testimonial: ['', Validators.required],
      testimonialproduct: [''],
      rating: ['', Validators.required],
      student_img: [''],
      user_name: ['', Validators.required],
      testimonial_id: ['', Validators.required]

    })
  }

  submitTestimonial() {

    if (this.addTestimonial.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      console.log(this.addTestimonial.value) 
        
      this.service.submitTestimonial(this.addTestimonial.value).subscribe((event: HttpEvent<any>) => {
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
              location.reload()
            }, 1500);

        }
      })
    }

  }

  getProduct(course) {
    this.service.getProductName(course).subscribe(
      (res)=> {
        console.log(res)
        this.productLists = res['product']
    })    
  }


  onSelectFileBackgroud(event) {
    const file = event.target.files && event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);        
        reader.onload = (event) => {
          this.src = (<FileReader>event.target).result;         
          this.addTestimonial.patchValue({
            student_img: this.src
          });
        }

      }
    }
  }

}
