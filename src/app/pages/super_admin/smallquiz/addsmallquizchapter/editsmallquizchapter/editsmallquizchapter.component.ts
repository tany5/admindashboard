import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EditsmallquizchapterService}  from './editsmallquizchapter.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editsmallquizchapter',
  templateUrl: './editsmallquizchapter.component.html',
  styleUrls: ['./editsmallquizchapter.component.scss']
})
export class EditsmallquizchapterComponent implements OnInit {
  showSubCategory: boolean = false
  quizChapter: FormGroup
  parentCategoryLists: any = []
  subCategory: any = []
  prodId: any
  chapter_name: any = ''
  small_quiz_type_id: number = 0
  small_quiz_child_type_id: number = 0
  constructor(private service: EditsmallquizchapterService, private _formbuilder: FormBuilder, private route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router) {

    this.route.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']
      })

      this.service.getSmallQuizChapterById(this.prodId).subscribe((res)=> {
        console.log(res)
        this.chapter_name = res[0]['chapter_name']
        this.small_quiz_type_id = res[0]['small_quiz_type_id']
        this.small_quiz_child_type_id = res[0]['small_quiz_child_type_id']
        if(this.small_quiz_child_type_id != 0) {
          this.showSubCategory = true

          this.service.getChildCategory(this.small_quiz_type_id).subscribe((res)=> {
            this.subCategory = res
            if(this.subCategory.length > 0) {
              this.showSubCategory = true
            }
            else {
              this.showSubCategory = false
            }
            console.log(this.subCategory)
          })
        }
      })


    this.service.getParentCategory().subscribe(
      (res)=> {              
        this.parentCategoryLists = res        
    })
   }

  ngOnInit(): void {
    this.quizChapter = this._formbuilder.group({
      parentCategory: ['', Validators.required],
      childCategory: ['0', Validators.required],
      catname: ['', Validators.required],
      small_chapter_id: ['', Validators.required]
    })
  }

  onParentCategoryChnage(type_id) {   
    this.service.getChildCategory(type_id).subscribe((res)=> {
      this.subCategory = res
      if(this.subCategory.length > 0) {
        this.showSubCategory = true
      }
      else {
        this.showSubCategory = false
        this.small_quiz_child_type_id = 0
        this.quizChapter.controls['childCategory'].setValue(this.small_quiz_child_type_id);
      }
      console.log(this.subCategory)
    })
  }

  submitchapter() {
    console.log(this.quizChapter.value)

    this.service.updateSmallQuizChapter(this.quizChapter.value).subscribe((res)=> {
      console.log(res)

      let snackbarRef = this.snackbar.open("Successfully Updated", "close", {
        duration: 2000 
      })

      snackbarRef.afterDismissed().subscribe(()=> {
        this.router.navigate(['/superadmin/add_small_quiz_chapter'])
      })

    })
   }

}
