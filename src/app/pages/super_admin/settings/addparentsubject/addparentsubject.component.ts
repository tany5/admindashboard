import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserData } from '../../addvideocourse/addvideocourse.component';
import { AddparentsubjectService } from './addparentsubject.service'
@Component({
  selector: 'app-addparentsubject',
  templateUrl: './addparentsubject.component.html',
  styleUrls: ['./addparentsubject.component.scss']
})
export class AddparentsubjectComponent implements OnInit {

  showLoader: boolean = false
  progress: number = 0
  addProductSubject: FormGroup


  displayedColumns: string[] = ['id', 'type_name', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  questionTypeLists: any = []

  product_id

  constructor(private _formbuilder: FormBuilder, private service: AddparentsubjectService, private router: Router, private route: ActivatedRoute, private snackbar: MatSnackBar) {
    this.service.getQuestionType().subscribe((res) => {
      console.log(res)
      this.questionTypeLists = res['all_question_type']
      this.dataSource = new MatTableDataSource(this.questionTypeLists);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.route.params.subscribe(
      (params: Params) => {
        this.product_id = params['prodId']
      })
  }

  ngOnInit(): void {
    this.addProductSubject = this._formbuilder.group({
      subject_name: ['', Validators.required]     
    })
  }

  addparentsubject() {
    if (this.addProductSubject.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      console.log(this.addProductSubject.value)
      this.service.submitParentSubject(this.addProductSubject.value).subscribe((event: HttpEvent<any>) => {
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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  edit_quiz(product_id) {
    this.router.navigate(['/superadmin/editparentsubject', product_id])

  }

  delete_quiz(product_id, product_name) {
    var result = confirm(`Are you sure you want to delete ${product_name} ??`)
    if(result) {
      this.service.delete_parent_subject_product_id(product_id).subscribe(
        (res)=> {
          console.log(res)
          let snackbarRef = this.snackbar.open(`${product_name} Deleted Successfully !!`, "Close", {
            duration: 2000
          })
          snackbarRef.afterDismissed().subscribe(
            ()=> {
              location.reload()            
          })
      })
    }

  }

}
