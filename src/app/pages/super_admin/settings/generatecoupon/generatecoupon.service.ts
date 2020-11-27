import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratecouponService {
  constructor(private webService: WebService) { }

  getPlan() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_plan`, headers)
  }

  couponAssignedPlan(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`coupon_assigned_plan`,{value}, headers)
  }

  getProduct(productType) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_product_by_product_type/${productType}`, headers)
  }


  getCuponAssignedDetails() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_cupon_assigned_details/`, headers)
  }

  updateCouponStatus(coupn_id, status) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`update_coupon_status/${coupn_id}/${status}`, headers)
  }
}
