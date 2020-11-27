import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class EditquestionbankquestionService {

  constructor(private webService: WebService) { }

  getQuestionAnswer(question_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_question_bank_quiz_answer_by_question_id/${question_id}`, headers)
  }

  getSubjectName() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_subject_name`, headers)
  }

  getChapterName(subject_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_chapter_name/${subject_id}`, headers)
  }

  getSubCategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_category`, headers)
  }

  submitQuestionBankQuestionAnswer(value2, value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})    
    return this.webService.post(`update_question_bank_quiz_question_answer`,{ value2, value }, headers)
  }
}
