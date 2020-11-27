import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {

  constructor(private webService: WebService) { }

  getStudentCount() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_student`, headers)
  }

  getQuestionCount() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_total_question`, headers)
  }

   geTestCount() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_total_test`, headers)
  }

  getProductCount() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_total_product`, headers)
  }

  geAllProduct() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_product`, headers)
  }

  orderHistory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`order_history`, headers)
  }


  getStudentByMonth(month, year) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_student_by_month/${month}/${year}`, headers)
  }


  getStudentByWeek(fromDate, toDate) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_student_by_tow_dates/${fromDate}/${toDate}`, headers)
  }

  getStudentByYear(year) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_student_by_year/${year}`, headers)
  }

  generateDougnutChart() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`generate_dougnut_chart`, headers)
  }


  generateYearDougnutChart(year) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`generate_dougnut_chart_by_year/${year}`, headers)
  }

  generateMonthDougnutChart(month, year) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`generate_dougnut_chart_by_months/${month}/${year}`, headers)
  }

  generateWeekDougnutChart(fromDate, toDate) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`generate_dougnut_chart_tow_dates/${fromDate}/${toDate}`, headers)
  }

  generateVideoCLassChart() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`generate_dougnut_video_course_chart`, headers)
  }

  generateVideoCLassYearDougnutChart(year) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`generate_dougnut_video_class_year/${year}`, headers)
  }

  generateVideoCLassMonthDougnutChart(month, year) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`generate_dougnut_video_class_by_months/${month}/${year}`, headers)
  }


  generateVideoCLassWeekDougnutChart(fromDate, toDate) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`generate_dougnut_video_class_tow_dates/${fromDate}/${toDate}`, headers)
  }

  

}
