import { Component, OnInit } from '@angular/core';
import { AsigncoupoService } from './asigncoupo.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-asigncoupon',
  templateUrl: './asigncoupon.component.html',
  styleUrls: ['./asigncoupon.component.scss']
})
export class AsigncouponComponent implements OnInit {
  progress: number = 0
  showLoader: boolean = false
  coupon: FormGroup
  getPlan: any = []
  allStudetns: any = []
  couponAsign: any = []
  couponAsignDetails: any = []
  isLinear: boolean = false

  constructor(private service: AsigncoupoService, private _formbuilder: FormBuilder, private snackbar: MatSnackBar) {
    this.service.getPlan().subscribe(
      (res) => {        
        this.getPlan = res['plan']
      })

    this.service.getAllStudent().subscribe(
      (res) => {
       
        this.allStudetns = res['student_list']
      })

     


  }

  ngOnInit(): void {
    this.coupon = this._formbuilder.group({     
      coupon_code: ['', Validators.required],
      plan: ['', Validators.required],
      student_id:['', Validators.required],
      duration:['', Validators.required]
    })
  }

 

  getDuration(planId){
    alert(planId)
    const result = this.getPlan.find(x => x.plan_id == planId)
   
    this.coupon.patchValue({
      duration:result.duration
    })
   
    this.service.getCuponAssignedPlanById(planId).subscribe(
      (res) => {  
        console.log(res)      
        this.couponAsign = res['cupon_assigned']
      })
  }

  submitCouponDetails() { 
    if(this.coupon.invalid) {
      alert("Please Add All Required Feild")
    }
    else {
      console.log(this.coupon.value)
      this.service.asignCoupon(this.coupon.value).subscribe((event: HttpEvent<any>) => {
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
                location.reload()
              })
            }
            else {
              let snackbarRef = this.snackbar.open(event.body.message, "close")
              snackbarRef.afterDismissed().subscribe(() => {
                location.reload()
              })
            }
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
    }
  }

}
