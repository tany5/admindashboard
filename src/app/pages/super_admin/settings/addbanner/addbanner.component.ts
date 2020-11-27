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
import { AddbannerService } from './addbanner.service'
@Component({
  selector: 'app-addbanner',
  templateUrl: './addbanner.component.html',
  styleUrls: ['./addbanner.component.scss']
})
export class AddbannerComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  src:any ="https://via.placeholder.com/468x160?text=course thumbnail  image"
  src2:any ="https://via.placeholder.com/468x160?text=course thumbnail  image"
  addBannerDetails: FormGroup
  showHomeBannerDetails: boolean = false

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

  bannerDetails: any = []
  
  displayedColumns: string[] = ['id', 'banner_name', 'banner_image', 'banner_type', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isDisabled: boolean = false


  constructor(private service: AddbannerService, private _formbuilder: FormBuilder, private router: Router, private snackbar: MatSnackBar) { 
    this.service.getBannerData().subscribe(
      (res)=> {
      
      this.bannerDetails = res['banner_details']
      console.log(this.bannerDetails)

      this.dataSource = new MatTableDataSource(this.bannerDetails);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
    this.addBannerDetails = this._formbuilder.group({
      banner_img:  [''],
      banner_name: [''],
      banner_type: ['', Validators.required],
      main_heading: [''],
      sub_heading: [''],
      banner_sub_sub_heading: [''],
      button_text: [''],
      image_link: [''],
      banner_background_image: [''],
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
          this.addBannerDetails.patchValue({
            banner_img: this.src
          });
        }

      }
    }
  }


  onSelectFileBackgroud(event) {
    const file = event.target.files && event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);        
        reader.onload = (event) => {
          this.src2 = (<FileReader>event.target).result;         
          this.addBannerDetails.patchValue({
            banner_background_image: this.src2
          });
        }

      }
    }
  }

  addBanner() {

    if (this.addBannerDetails.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      console.log(this.addBannerDetails.value)
      
      this.service.submitBanner(this.addBannerDetails.value).subscribe((event: HttpEvent<any>) => {
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

  setAdditionalItems(home) {

    if(home == 6) {
      this.showHomeBannerDetails = true
      this.isDisabled = true
    }
    else {
      this.showHomeBannerDetails = false
      this.isDisabled = false
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit_quiz(banner_id, banner_type) {
    this.router.navigate(['/superadmin/editbanner', banner_id, banner_type])

  }

  delete_quiz(banner_id, banner_name, banner_type) {
    var result = confirm(`Are you sure you want to delete ${banner_name} ??`)
    if(result) {
      this.service.deleteBanner(banner_id, banner_type).subscribe(
        (res)=> {
          console.log(res)
          let snackbarRef = this.snackbar.open(`${banner_name} Deleted Successfully !!`, "Close", {
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
