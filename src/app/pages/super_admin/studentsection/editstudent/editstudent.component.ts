import { Component, OnInit } from '@angular/core';
import { EditstudenService } from './editstuden.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.scss']
})
export class EditstudentComponent implements OnInit {
  prodId: any
  showLoader: boolean = false
  progress: number = 0
  student: FormGroup
  hide = true
  hide2 = true
  src: any = "https://via.placeholder.com/468x160?text=Student image"
  studentDetails: any = []
  student_name
  student_email
  student_phone
  student_img

  constructor(private service: EditstudenService, private route: ActivatedRoute, private _formbuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router) {
    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
      })

    this.service.getStudentById(this.prodId).subscribe(
      (res) => {
        console.log(res)
        this.studentDetails = res['student_details'][0]
        this.student_name = this.studentDetails['user_name']
        this.student_email = this.studentDetails['user_email']
        this.student_phone = this.studentDetails['user_phone']
        this.src = "http://localhost/avisionEstore/"+this.studentDetails['user_img']
      })
  }

  ngOnInit(): void {
    this.student = this._formbuilder.group({
      student_name: ['', Validators.required],
      student_email: ['', [Validators.required, Validators.email]],
      student_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9 ]{10}")]],    
      student_img: [''],
      student_id: ['', Validators.required]
      
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
          this.student.patchValue({
            student_img: this.src
          });
        }

      }
    }
  }

  submitStudentDetails() {
    console.log(this.student.value)
    if (this.student.invalid) {
      alert("Please Add All Requird Feilds...")
    }
    else {
      this.service.editStudent(this.student.value).subscribe((event: HttpEvent<any>) => {
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
            if (event.body.status == '200') {
              let snackbarRef = this.snackbar.open(event.body.message, "close", {
                duration: 2000
              })

              snackbarRef.afterDismissed().subscribe(() => {
                this.router.navigate(['/superadmin/studentsection'])
              })
            }
            else {
              let snackbarRef = this.snackbar.open(event.body.message, "close")
              snackbarRef.afterDismissed().subscribe(() => {
                this.router.navigate(['/superadmin/studentsection'])
              })
            }

            console.log(event.body.message)



            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
    }
  }
  getErrorMessage() {
    if (this.student.get('student_email').hasError('required')) {
      return 'You must enter a value';
    }
    return this.student.get('student_email').hasError('email') ? 'Not a valid email' : '';
  }

}
