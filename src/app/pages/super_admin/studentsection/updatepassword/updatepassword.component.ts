import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UpdatepasswordService } from './updatepassword.service'
@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.scss']
})
export class UpdatepasswordComponent implements OnInit {

  showLoader: boolean = false
  progress: number = 0
  student: FormGroup
  hide = true
  hide2 = true
  prodId: any
  constructor(private service: UpdatepasswordService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
      })
  }

  ngOnInit(): void {
    this.student = this._formbuilder.group({
      student_password: ['', Validators.required],
      student_re_password: ['', Validators.required],
      student_id: ['', Validators.required]
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


  submitStudentDetails() {
    console.log(this.student.value)
    if (this.student.invalid) {
      alert("Please Add All Requird Feilds...")
    }
    else {   
      this.service.updateStudentPassword(this.student.value).subscribe((event: HttpEvent<any>) => {
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
