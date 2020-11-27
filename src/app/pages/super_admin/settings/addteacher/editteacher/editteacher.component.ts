import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EditteacherService } from './editteacher.service'
@Component({
  selector: 'app-editteacher',
  templateUrl: './editteacher.component.html',
  styleUrls: ['./editteacher.component.scss']
})
export class EditteacherComponent implements OnInit {

  addTeacher: FormGroup
  showLoader: boolean = false
  progress: number = 0
  courses: any = []
  quizType: any = []

  teacherDetails: any = []
  teacher_id: any

  teacher_name: any
  teacher_phone: any
  teacher_pass_val: any
  teacher_qualification: any
  teacher_designation: any
  teacher_experience: any
  teacher_course: any = []
  teacher_course_assign: any = []
  showCourse: boolean = false

  src: any = "https://via.placeholder.com/468x160?text=course thumbnail  image"

  constructor(private service: EditteacherService, private _formbuilder: FormBuilder, private router: Router, private snackbar: MatSnackBar, private route: ActivatedRoute) {
    this.service.getCourseName().subscribe(
      (res) => {
        this.courses = res
      })

    this.service.getSmallQuiz().subscribe(
      (res) => {
        this.quizType = res['quiz_type']
      })

      this.route.params.subscribe(
        (params: Params) => {
          this.teacher_id = params['prodId']          
          
      })

      this.service.getTeacherById(this.teacher_id).subscribe(
        (res) => {
          this.teacherDetails = res['teacher_details']         
          this.teacher_name =this.teacherDetails['teacher_details'][0]['teacher_name'] 
          this.teacher_phone =this.teacherDetails['teacher_details'][0]['teacher_phone'] 
          this.teacher_pass_val =this.teacherDetails['teacher_details'][0]['teacher_pass_val']
          this.teacher_qualification =this.teacherDetails['teacher_details'][0]['teacher_qualification'] 
          this.teacher_designation =this.teacherDetails['teacher_details'][0]['teacher_designation'] 
          this.teacher_experience =this.teacherDetails['teacher_details'][0]['teacher_experience'] 

          for(var i = 0; i< this.teacherDetails['teacher_course'].length; i++) {            
            this.teacher_course.push(this.teacherDetails['teacher_course'][i]['course_id'])  
          }

          for(var i = 0; i< this.teacherDetails['teacher_course_assign'].length; i++) {
            this.teacher_course_assign.push(this.teacherDetails['teacher_course_assign'][i]['live_course_id']) 
          }

          console.log(this.teacher_course, this.teacher_course_assign)
          this.showCourse = true
        })



  }

  ngOnInit(): void {
    this.addTeacher = this._formbuilder.group({
      addteachername: ['', Validators.required],
      addteacherph: ['', Validators.required],
      password: ['', Validators.required],
      exp: ['', Validators.required],
      qualification: ['', Validators.required],
      designation: ['', Validators.required],
      course: ['', Validators.required],
      teacher_img: [''],
      quizType: ['', Validators.required],
      teacher_id: ['']
    })
  }

  submitTeacherDetails() {    
    if (this.addTeacher.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      this.service.submitTeacherDetails(this.addTeacher.value).subscribe((event: HttpEvent<any>) => {
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

            var target = document.getElementById("page-header");
            target.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

            setTimeout(() => {
              this.progress = 0;
              this.showLoader = false
              location.reload()
            }, 1500);

        }
      })
    }
  }


  onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          this.src = (<FileReader>event.target).result;
          this.addTeacher.patchValue({
            teacher_img: this.src
          });
        }

      }
    }
  }

}
