import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserData } from '../../addvideocourse/addvideocourse.component';
import { AddteacherService } from './addteacher.service'
@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.scss']
})
export class AddteacherComponent implements OnInit {
  addTeacher: FormGroup
  showLoader: boolean = false
  progress: number = 0
  courses: any = []
  quizType: any = []

  teacherDetails: any = []

  src: any = "https://via.placeholder.com/468x160?text=course thumbnail  image"

  displayedColumns: string[] = ['id', 'teacher_name', 'teacher_phone', 'teacher_experience', 'teacher_qualification', 'teacher_designation', 'teacher_image', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: AddteacherService, private _formbuilder: FormBuilder, private router: Router, private snackbar: MatSnackBar) {
    this.service.getCourseName().subscribe(
      (res) => {
        this.courses = res
      })

    this.service.getSmallQuiz().subscribe(
      (res) => {
        this.quizType = res['quiz_type']
      })


    this.service.getTeacher().subscribe(
      (res) => {

        this.teacherDetails = res['teacher_details']
        this.dataSource = new MatTableDataSource(this.teacherDetails);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
      quizType: ['', Validators.required]
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




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit_teacher(teacher_id) {
    this.router.navigate(['/superadmin/editteacher', teacher_id])

  }

  delete_teacher(teacher_id, teacher_name) {
    var result = confirm(`Are you sure you want to delete ${teacher_name} ??`)
    if (result) {
      this.service.deleteTeacher(teacher_id).subscribe(
        (res) => {
          console.log(res)
          let snackbarRef = this.snackbar.open(`${teacher_name} Deleted Successfully !!`, "Close", {
            duration: 2000
          })
          snackbarRef.afterDismissed().subscribe(
            () => {
              location.reload()
            })
        })
    }
  }

}
