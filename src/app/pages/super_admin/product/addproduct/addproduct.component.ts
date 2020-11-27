import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AddproductService } from './addproduct.service'
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

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
  productId: any = 42
  quizLists: any = []


  displayedColumns: string[] = ['id', 'productname', 'productdesc', 'productcode', 'productimg', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  productDetails: any = []
  dataSource: any;


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

  constructor(private service: AddproductService, private _formbuilder: FormBuilder, public datepipe: DatePipe, private router: Router) {
    this.service.getAllSubject().subscribe(
      (res) => {
        console.log(res)
        this.subjectLists = res
      })

      this.service.getTestSeriesProduct().subscribe((res)=> {     
        this.productDetails = res['product_details']  
        console.log(this.productDetails)    
        this.dataSource = new MatTableDataSource(this.productDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  ngOnInit(): void {
    this.addProduct = this._formbuilder.group({
      subject: ['', Validators.required],
      productname: ['', Validators.required],
      productcode: ['', Validators.required],
      product_desc: ['', Validators.required],
      product_img: []
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit_quiz(product_id) {
    this.router.navigate(['superadmin/eidtproduct/', product_id])
  }

  delete_course(quiz_id, quiz_name) {
    
    // var result = confirm(`Are You Sure to Delete ${quiz_name}?`)
    // if(result) {
    //   this.service.deletequiz(quiz_id).subscribe((res)=> {
    //     this.service.getSectionalLengthQuiz().subscribe((res)=> {     
    //       this.fullLengthQuiz = res['all_full_length_quiz']      
    //       this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //     })
    //     var snackbarRef = this.snackbar.open(`${quiz_name} Deleted Successfully !!`, "close", {
    //       duration: 2000
    //     })
       
    //   })
    // }
  }

}
