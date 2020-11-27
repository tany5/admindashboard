import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EditbannerService } from './editbanner.service'
@Component({
  selector: 'app-editbanner',
  templateUrl: './editbanner.component.html',
  styleUrls: ['./editbanner.component.scss']
})
export class EditbannerComponent implements OnInit {

  showLoader: boolean = false
  progress: number = 0
  src:any ="https://via.placeholder.com/468x160?text=course thumbnail  image"
  src2:any ="https://via.placeholder.com/468x160?text=course thumbnail  image"
  addBannerDetails: FormGroup
  showHomeBannerDetails: boolean = false
  banner_id: any
  banner_type: any 

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

  banner_name: any =''
  get_banner_type: any
  banner_image: any
  isDisabled: boolean = false
  banner_background_image: any
  main_heading: any
  banner_sub_sub_heading: any
  button_text: any
  image_link: any
  sub_heading: any


  constructor(private service: EditbannerService, private _formbuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params: Params) => {
        this.banner_id = params['prodId']
        this.banner_type = params['prodType']

        if(this.banner_type == 6) {
          this.showHomeBannerDetails = true
          this.isDisabled = true          
        }
        
        
      })

      this.service.getBannerData(this.banner_id, this.banner_type).subscribe(
        (res)=> {
        console.log(res)
        this.banner_name = res['banner_details'][0]['banner_name']
        if(!this.banner_name) {
          this.banner_name = ''
        }
        this.get_banner_type = res['banner_details'][0]['banner_type']
        if(!this.get_banner_type) {
          this.get_banner_type = this.banner_type
        }
        this.banner_image = res['banner_details'][0]['banner_image']
        this.banner_background_image = res['banner_details'][0]['banner_background_image']
        this.src = "http://localhost/avisionEstore/"+this.banner_image
        this.src2 = "http://localhost/avisionEstore/"+this.banner_background_image
        this.main_heading = res['banner_details'][0]['main_heading']
        this.banner_sub_sub_heading = res['banner_details'][0]['banner_sub_sub_heading']
        this.button_text = res['banner_details'][0]['button_text']
        this.image_link = res['banner_details'][0]['image_link']
        this.sub_heading = res['banner_details'][0]['sub_heading']
      })


   }

  ngOnInit(): void {
    this.addBannerDetails = this._formbuilder.group({
      banner_img:  [''],
      banner_name: [' '],
      banner_type: ['', Validators.required],
      main_heading: [''],
      sub_heading: [''],
      banner_sub_sub_heading: [''],
      button_text: [''],
      image_link: [''],
      banner_background_image: [''],
      banner_id: ['']
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

}
