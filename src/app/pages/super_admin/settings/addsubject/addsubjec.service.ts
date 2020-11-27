import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebService } from 'src/app/web.service';

@Injectable({
  providedIn: 'root'
})
export class AddsubjecService {

  constructor(private webService: WebService) { }

  getQuestionType() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_question_type`, headers)
  }
  submitchapter(value) {
    let headers = new  HttpHeaders ({'Content-Type': 'text/plain'})
    return this.webService.post(`add_product_sub_chapter`,{value}, headers)    
  }

  getChapterName(id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_chapter_name/${id}`, headers)
  }

  getVideoChapter() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_sub_chapter_name`, headers)
  }

  deleteChapter(chapter_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`delete_chapter/${chapter_id}`, headers)    
  }

  getAllChapterById(subject_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_all_chapter_by_id/${subject_id}`, headers)
  }

  getAllsubcategory() {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_sub_category_name`, headers)    
  }

  getCourseTypeSection(parent_category_id) {
    let headers = new  HttpHeaders ({'Content-Type': 'application/json'})
    return this.webService.get(`get_course_type_section/${parent_category_id}`, headers)
  }
}
