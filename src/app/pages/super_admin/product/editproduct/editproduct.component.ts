import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EditproducService } from './editproduc.service'
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

  addProduct: FormGroup
  addProductPrice: FormGroup
  addProductQuiz: FormGroup
  submitPublishDetails: FormGroup
  isLinear: boolean = false
  subjectLists: any = []
  src: any = "https://via.placeholder.com/568x260?text= Product thumbnail  image"
  @ViewChild('stepper') private myStepper: MatStepper;
  progress: number = 0
  showLoader: boolean = false
  productId: any 
  quizLists: any = []
  productDetails: any = []

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

  product_name: any
  product_desc: any
  product_code: any
  product_img: any
  sub_cat_id: any
  product_price: any
  product_offer_price: any
  startdate: any
  enddate: any
  showProduct: boolean = false
  assingnedQuiz: any =[]

  constructor(private service: EditproducService, private _formbuilder: FormBuilder, private datepipe: DatePipe, private route: ActivatedRoute) {
    this.service.getAllSubject().subscribe(
      (res) => {
        console.log(res)
        this.subjectLists = res
      })

    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['prodId']
    })

    this.service.getTestSeriesProductById(this.productId).subscribe((res)=> {
      console.log(res)     
      this.product_name = res['product_details'][0]['product_name']
      this.product_desc = res['product_details'][0]['product_desc']
      this.sub_cat_id = res['product_details'][0]['sub_cat_id']
      this.product_img = res['product_details'][0]['product_img']
      this.product_code = res['product_details'][0]['product_code']
      this.product_price = res['product_details'][0]['product_price']
      this.product_offer_price = res['product_details'][0]['product_offer_price']
      this.quizLists = res['all_quiz']
      this.src = "http://localhost/avisionEstore/"+this.product_img

      

      this.startdate = res['product_details'][0]['from_date']
      this.enddate = res['product_details'][0]['to_date']


      for(var i =0; i <  res['test_series_details'].length; i++) {
        this.assingnedQuiz.push(res['test_series_details'][i]['quiz_id'] )          
      }
      


      this.showProduct = true
    })
  }

  ngOnInit(): void {

    this.addProduct = this._formbuilder.group({
      subject: ['', Validators.required],
      productname: ['', Validators.required],
      productcode: ['', Validators.required],
      product_desc: ['', Validators.required],
      product_img: [],
      product_id: []
    })

    this.addProductPrice = this._formbuilder.group({
      regularprice: ['', Validators.required],
      offerprice: ['', Validators.required],
      product_id: ['', Validators.required]
    })

    this.addProductQuiz = this._formbuilder.group({
      quizname: ['', Validators.required],
      product_id: ['', Validators.required]
    })

    this.submitPublishDetails = this._formbuilder.group({
      startdate: [''],
      enddate: [''],
      status: [],
      product_id: ['', Validators.required]
    })

  }


  onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.src = (<FileReader>event.target).result;
          this.addProduct.patchValue({
            product_img: this.src
          });
        }

      }
    }
  }



  addproductDetails() {
    if (this.addProduct.invalid) {
      alert("Plaese Add All Required Feild.....")
    }
    else {
      console.log(this.addProduct.value)

      this.service.submitTestSeries(this.addProduct.value).subscribe((event: HttpEvent<any>) => {
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
            this.productId = event.body.test_series_id
            console.log(this.productId)
            this.showLoader = false
            this.myStepper.next()
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
    }
  }

  addproductPriceDetails() {
    if (this.addProductPrice.invalid) {
      alert("Please add all Required feilds")
    }
    else {
      console.log(this.addProductPrice.value)
      this.service.submitTestSeriesPriceDetails(this.addProductPrice.value).subscribe((event: HttpEvent<any>) => {
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
            this.quizLists = event.body.quiz_lists
            console.log(this.quizLists)
            this.showLoader = false
            this.myStepper.next()
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
    }
  }


  addproductQuizDetails() {

    if (this.addProductQuiz.invalid) {
      alert("Please add all Required feilds")
    }
    else {
      console.log(this.addProductQuiz.value)
      
      this.service.submitTestSeriesQuizDetails(this.addProductQuiz.value).subscribe((event: HttpEvent<any>) => {
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
            console.log(event.body)
            this.showLoader = false
            this.myStepper.next()
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
    }

  }


  submit_pubish(status) {

    let startdate = this.datepipe.transform(this.submitPublishDetails.get('startdate').value, 'yyyy/MM/dd')
    let enddate = this.datepipe.transform(this.submitPublishDetails.get('enddate').value, 'yyyy/MM/dd')
    console.log(startdate, enddate, status)

    this.submitPublishDetails.patchValue({
      startdate: startdate,
      enddate: enddate,
      status: status
    })

    console.log(this.submitPublishDetails.value)

    this.service.publishTestSeries(this.submitPublishDetails.value).subscribe((event: HttpEvent<any>) => {
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
          console.log(event.body)
          this.showLoader = false
          this.myStepper.next()
          setTimeout(() => {
            this.progress = 0;
          }, 1500);

      }
    })
  }

  goBack() {
    location.reload()
  }


 

}
