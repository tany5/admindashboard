import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserData } from '../../addvideocourse/addvideocourse.component';
import { ShowvideomodalComponent } from '../../study/addstudyvideo/showvideomodal/showvideomodal.component';
import { AddyoutubevideoService } from './addyoutubevideo.service'
@Component({
  selector: 'app-addyoutubevideo',
  templateUrl: './addyoutubevideo.component.html',
  styleUrls: ['./addyoutubevideo.component.scss']
})
export class AddyoutubevideoComponent implements OnInit {
  showLoader: boolean = false
  progress: number = 0
  addVideo: FormGroup
  videoLists: any =[]
  displayedColumns: string[] = ['id', 'video_name', 'video_link', 'video_img', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _formbuilder: FormBuilder, private service: AddyoutubevideoService, private router: Router, private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.service.getVideo().subscribe(
      (res)=> {
        this.videoLists = res['video_details']
        this.dataSource = new MatTableDataSource(this.videoLists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
   }

  ngOnInit(): void {
    this.addVideo = this._formbuilder.group({
      videoname: ['', Validators.required],
      videolink: ['', Validators.required]
    })
  }

  submitVideoDetails() {
    if (this.addVideo.invalid) {
      alert(" Please add all requird feild")
    }
    else {
      this.service.submitVideoDetails(this.addVideo.value).subscribe((event: HttpEvent<any>) => {
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

  edit_teacher(video_id) {
    this.router.navigate(['/superadmin/edityoutubevideo', video_id])

  }

  delete_teacher(video_id, video_name) {
    var result = confirm(`Are you sure you want to delete ${video_name} ??`)
    if (result) {
      this.service.deleteVideo(video_id).subscribe(
        (res) => {
          
          let snackbarRef = this.snackbar.open(`${video_name} Deleted Successfully !!`, "Close", {
            duration: 2000
          })
          snackbarRef.afterDismissed().subscribe(
            () => {
              location.reload()
            })
        })
    }
  }


  openvideo(study_vdo_id, study_vdo_lecture_name, study_vdo_code) {
    const dialogRef = this.dialog.open(ShowvideomodalComponent, {     
      disableClose: true,       
      data: { video_id: study_vdo_id, lecture_name: study_vdo_lecture_name, study_vdo_code: study_vdo_code}   
    });   

  }


}
