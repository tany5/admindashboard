import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserData } from '../addvideocourse.component';
import { EditvideocoursService } from './editvideocours.service'
@Component({
  selector: 'app-editvideocourse',
  templateUrl: './editvideocourse.component.html',
  styleUrls: ['./editvideocourse.component.scss']
})
export class EditvideocourseComponent implements OnInit {

  showLoader: boolean = false
  progress: number = 0
  subjectLists: any =[]
  isLinear: boolean = false
  addVideoProduct: FormGroup
  courseLists: any = []
  src: any = "https://via.placeholder.com/568x360?text= Product thumbnail  image"
  productId: any
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

  videoProductDetails: any = []

  videotitle: any
  videocourse: any
  actual_price: any
  offer_price: any
  video_count: any
  video_lang: any
  video_validity: any
  video_desc: any


   displayedColumns: string[] = ['id', 'video_name', 'type_name', 'chapter_name','action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fullLengthQuiz: any = []

  totalVideocount: number 
  addedVideo: number




  constructor(private service: EditvideocoursService, private _formbuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private snackbar: MatSnackBar) {

     this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['prodId']
    })


    this.service.getVideoProductDetails(this.productId).subscribe((res)=> {
      console.log(res)    
      this.fullLengthQuiz = res['video_details']      
      this.dataSource = new MatTableDataSource(this.fullLengthQuiz);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })



    this.service.getAllCourses().subscribe(
      (res)=> {
        this.courseLists = res
    })

   

    this.service.getVideoProductDetails(this.productId).subscribe(
      (res)=> {  
        console.log(res)    
        this.videoProductDetails = res['video_product_details'][0] 
        console.log(this.videoProductDetails) 
        this.videotitle = this.videoProductDetails['product_name']
        this.videocourse = this.videoProductDetails['video_course']
        this.actual_price = this.videoProductDetails['product_price']
        this.offer_price = this.videoProductDetails['product_offer_price']
        this.video_count = this.videoProductDetails['video_count']
        this.video_lang = this.videoProductDetails['video_lang']
        this.video_validity = this.videoProductDetails['validity']
        this.video_desc = this.videoProductDetails['product_desc']
        this.src = "http://localhost/avisionEstore/"+this.videoProductDetails['video_thumb_image']

        this.addedVideo = res['video_count']
    })

   }

  ngOnInit(): void {
    this.addVideoProduct = this._formbuilder.group({
      videotitle: ['', Validators.required],
      videocourse: ['', Validators.required],
      actual_price: ['', Validators.required],
      offer_price: ['', Validators.required],
      video_count: ['', Validators.required],
      video_lang: ['', Validators.required],
      video_validity: ['', Validators.required],
      video_desc: ['', Validators.required],
      video_thumb:[''],
      product_id:['']
      
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
          this.addVideoProduct.patchValue({
            video_thumb: this.src
          });
        }

      }
    }
  }


  addVideoproductDetails() {
    if(this.addVideoProduct.invalid){
      alert(" Please add all requird feild")
    }
    else{
      console.log(this.addVideoProduct.value)
      this.service.submitVideoData(this.addVideoProduct.value).subscribe((event: HttpEvent<any>) => {
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
  edit_quiz(video_id){
    this.router.navigate(['/superadmin/editvideoproductbyid', video_id])    
  }

  delete_quiz(video_id, video_name) {
    var result = confirm(`Are you sure you want to delete ${video_name} ??`)
    if(result) {
      this.service.deleteVideoProduct(video_id).subscribe(
        (res)=> {
          console.log(res)
          let snackbarRef = this.snackbar.open(`${video_name} Deleted Successfully !!`, "Close", {
            duration: 2000
          })
          snackbarRef.afterDismissed().subscribe(
            ()=> {
              location.reload()            
          })
      })
    }
  }

  addvideo() {
    

    this.router.navigate(['/superadmin/addvideoproductbyid', this.productId])
  }

  

}
