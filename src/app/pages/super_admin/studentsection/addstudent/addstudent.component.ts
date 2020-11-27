import { Component, OnInit } from '@angular/core';
import { AddstudenService } from './addstuden.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})
export class AddstudentComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  student: FormGroup
  hide = true
  hide2 = true
  value
  showPhoneEmailError: boolean = false
  message: string
  src: any = "https://via.placeholder.com/568x160?text=Student image"
  constructor(private service: AddstudenService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.student = this._formbuilder.group({
      student_name: ['', Validators.required],
      student_email: ['', [Validators.required, Validators.email]],
      student_phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9 ]{10}")]],
      student_password: ['', Validators.required],
      student_re_password: ['', Validators.required],
      student_img: ['']
    }, { validator: this.checkIfMatchingPasswords('student_password', 'student_re_password') })
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
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

     
      this.service.addStudent(this.student.value).subscribe((event: HttpEvent<any>) => {
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
              this.showPhoneEmailError = true
              this.message = event.body.message
              var element = document.getElementById("video-course-section");
              element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});

              let snackbarRef = this.snackbar.open(event.body.message, "close", {
                duration: 2000
              })
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

    if (this.student.get('student_email').hasError('email')) {
      return 'Not a valid email'
    }
    else { 
      return ''      
    }

  }

  


}


