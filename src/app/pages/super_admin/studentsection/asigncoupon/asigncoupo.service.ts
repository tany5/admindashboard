import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from './../../../../web.service';

@Injectable({
  providedIn: 'root'
})
export class AsigncoupoService {

  constructor(private webService: WebService) { }

  getPlan() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_plan`, headers)
  }

  getAllStudent() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_student`, headers)
  }

  getCuponAssignedPlan() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_cupon_assigned_plan`, headers)
  }

 asignCoupon(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`asign_coupon_code`,{value}, headers)
  }

   getCuponAssignedPlanById(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_cupon_assigned_plan_by_id/${id}`, headers)
  }


}
