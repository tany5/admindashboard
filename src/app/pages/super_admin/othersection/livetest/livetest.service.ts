import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from '../../../../web.service'
@Injectable({
  providedIn: 'root'
})
export class LivetestService {

  constructor(private webService: WebService) { }

  getAllQuizForLiveTest() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_quiz_for_live_test`, headers)
  }
  
  submitTestSeries(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`update_test_series_details`,{value}, headers)
  }

  updateLiveClassStatus(quiz_id, status){
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.get(`update_live_class_status/${quiz_id}/${status}`, headers)    
  }
}
