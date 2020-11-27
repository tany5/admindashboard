import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserData } from '../../addvideocourse/addvideocourse.component';
import { TestimonialService } from './testimonial.service'
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
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

  displayedColumns: string[] = ['id', 'content', 'courses_name', 'product_name', 'rating', 'user_name', 'image', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  testimonialDetails: any = []

  constructor(private service: TestimonialService, private _formbuilder: FormBuilder, private router: Router, private snackbar: MatSnackBar) { 
    this.service.getCourseName().subscribe((res)=> {     
      this.courseLists = res      
    })

    this.service.getTestimonialData().subscribe(
      (res)=> {
      
      this.testimonialDetails = res['testimonial_details']
      console.log(this.testimonialDetails)

      this.dataSource = new MatTableDataSource(this.testimonialDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
  }

  ngOnInit(): void {
    this.addTestimonial = this._formbuilder.group({
      testimonialcourse: [''],
      testimonial: ['', Validators.required],
      testimonialproduct: [''],
      rating: ['', Validators.required],
      student_img: ['', Validators.required],
      user_name: ['', Validators.required]

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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit_quiz(id) {
    this.router.navigate(['/superadmin/edittestimonial', id])

  }

  delete_quiz(id, user_name) {
    var result = confirm(`Are you sure you want to delete Testimonial ${user_name} ??`)
    if(result) {
      this.service.deleteTestimonial(id).subscribe(
        (res)=> {
          console.log(res)
          let snackbarRef = this.snackbar.open(`${user_name} Deleted Successfully !!`, "Close", {
            duration: 2000
          })
          snackbarRef.afterDismissed().subscribe(
            ()=> {
              location.reload()              
          })
      })
    }

  }

}
