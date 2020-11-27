import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeneratecouponService } from './generatecoupon.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-generatecoupon',
  templateUrl: './generatecoupon.component.html',
  styleUrls: ['./generatecoupon.component.scss']
})
export class GeneratecouponComponent implements OnInit {
  progress: number = 0
  showLoader: boolean = false
  coupon: any
  showCoupon: boolean = false
  asignCoupon: FormGroup
  productDetails: any = []

  displayedColumns: string[] = ['id', 'cuponcode', 'offerprice', 'productname', 'couponstatus', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any = []
  allStudent: any = []

  constructor(private _formbuilder: FormBuilder, private service: GeneratecouponService, private snackbar: MatSnackBar) {
    this.makcoupon(6)

    this.service.getCuponAssignedDetails().subscribe((res)=> {    
      console.log(res) 
      this.allStudent = res['cupon_details']      
      this.dataSource = new MatTableDataSource(this.allStudent);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngOnInit(): void {
    this.asignCoupon = this._formbuilder.group({
      offer_price: ['', Validators.required],
      coupon: ['', Validators.required],
      coupon_status: ['', Validators.required],
      product_id: ['', Validators.required]

    })
  }


  makcoupon(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.coupon = result
    this.showCoupon = true
  }

  submitCoupnDetails() {
    if (this.asignCoupon.invalid) {

    }
    else {
      console.log(this.asignCoupon.value)
      this.service.couponAssignedPlan(this.asignCoupon.value).subscribe((event: HttpEvent<any>) => {
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

  async getProductDetails(productType) {
    this.productDetails = [];
    if (productType == 2) {
      await this.service.getPlan().subscribe(
        (res) => {
          console.log(res)
          for (var i = 0; i <= res['plan'].length; i++) {
            this.productDetails.push({ 'product_id': res['plan'][i]['plan_id'], 'product_name': res['plan'][i]['plan_name'] })
          }
        })
      console.log(this.productDetails)
    }
    else {
      await this.service.getProduct(productType).subscribe(
        (res) => {
          for (var i = 0; i <= res['product_details'].length; i++) {
            this.productDetails.push({ 'product_id': res['product_details'][i]['product_id'], 'product_name': res['product_details'][i]['product_name'] })
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

  edit_quiz(id, status) {
    var result = confirm("Are Sure To Update Status !!")
    if(result) {
      this.service.updateCouponStatus(id, status).subscribe(
        (res)=> {
        location.reload()
      })
    }   
    
  }

  update_password(id) {
    //this.router.navigate(['/superadmin/updatepassword', id])
  }

}
