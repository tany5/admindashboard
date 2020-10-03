import { Component, OnInit, ViewChild } from '@angular/core';
import { AddliveclassvideoService } from './addliveclassvideo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient } from '@angular/common/http';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddliveclassvideomodalComponent } from './../../addliveclassvideomodal/addliveclassvideomodal.component';
import { Observable } from 'rxjs';
import { EditliveclassmodalComponent } from './../../editliveclassmodal/editliveclassmodal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addliveclassvideo',
  templateUrl: './addliveclassvideo.component.html',
  styleUrls: ['./addliveclassvideo.component.scss']
})
export class AddliveclassvideoComponent implements OnInit {
  liveClassList: any = []
  liveClassData: any = []
  subjectLists: any = []
  chapterList: any = []
  videoDataList: any = []

  showLiveCLassData: boolean = false
  displayedColumns: string[] = ['id', 'live_class_title', 'action'];
  @ViewChild("tabGroup") tab: MatTabGroup;
  @ViewChild('stepper') private myStepper: MatStepper;
  date1: string = ''
  isLinear: boolean = true
  live_class_meta_id: any
  product_id: any
  dayId: any = 0
  
  constructor(private addLiveClassService: AddliveclassvideoService, private _formBuilder: FormBuilder, private http: HttpClient, private dialog: MatDialog, private _snackBar: MatSnackBar) {

    this.dayId = 0
    
    this.addLiveClassService.getLiveClassData().subscribe(
      (res) => {
        console.log(res)
        this.liveClassList = res
      })

    this.addLiveClassService.getSubject().subscribe(
      (res) => {
        this.subjectLists = res
      })


  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.liveClassList.filter = filterValue.trim().toLowerCase();
  }

  addLiveClassVideo(live_class_meta_id, product_id) {
    
    this.showLiveCLassData = true

    this.live_class_meta_id = live_class_meta_id
    this.product_id = product_id


    this.addLiveClassService.getLiveClassDayData(this.live_class_meta_id, this.product_id, 1).subscribe(
      (res)=> {
        console.log(res)
        this.videoDataList = res
      })

    this.addLiveClassService.getLiveClassDataById(live_class_meta_id).subscribe(
      (res) => {
        console.log(res)
        this.liveClassData = res
        let selectedIndex = 0
        this.date1 = this.liveClassData[0]['start_date']

      })
  }

  createRange(number) {
    var items = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  getNextDay(date, i) {
    const today = new Date(date);
    const tomorrow = new Date(today.setDate(today.getDate() + i));
    return tomorrow
  }



  getChapter(id) {
    this.addLiveClassService.getChapter(id).subscribe(
      (res) => {
        console.log(res)
        this.chapterList = res
      }
    )
  }


  onSequenceChangeEvent(event: MatTabChangeEvent) {
    console.log(event.index);
    //event.tab.textLabel = "a"

    this.addLiveClassService.getLiveClassDayData(this.live_class_meta_id, this.product_id, event.index+1).subscribe(
      (res)=> {
        console.log(res)
        this.videoDataList = res
      })

  }

  
 
  

  openDialog(dayId) {   
    this.dayId = dayId
    const dialogRef = this.dialog.open(AddliveclassvideomodalComponent, {
      width: '100%',
      disableClose: true,
      height: '80vh',      
      data: { dayId: this.dayId , live_class_meta_id: this.live_class_meta_id,
        product_id: this.product_id}
    });

    dialogRef.afterClosed().subscribe(
     (res)=> {
      this.addLiveClassService.getLiveClassDayData(this.live_class_meta_id, this.product_id, this.dayId).subscribe(
        (res)=> {
          console.log(res)
          this.videoDataList = res
        })
     }
    )
  }


  editLiveClass(video_id) {
    const dialogRef = this.dialog.open(EditliveclassmodalComponent, {
      width: '100%',
      disableClose: true,
      height: '80vh',      
      data: { video_id: video_id}
    });

    dialogRef.afterClosed().subscribe(
     (res)=> {
      this.addLiveClassService.getLiveClassDayData(this.live_class_meta_id, this.product_id, this.dayId).subscribe(
        (res)=> {
          console.log(res)
          this.videoDataList = res
        })
     }
    )
  }


  deleteLiveClassVideo(video_id) {
    var result = confirm("Want to delete?");
    if (result) {
      this.addLiveClassService.deleteLiveClassVideo(video_id).subscribe(
        (res)=> {
          console.log(res)
          let snackBarRef = this._snackBar.open("Live Class Deleted Successfully !!", "Close", {
            duration: 2000,
          });

          snackBarRef.afterDismissed().subscribe(()=> {
            this.addLiveClassService.getLiveClassDayData(this.live_class_meta_id, this.product_id, this.dayId).subscribe(
              (res)=> {
                console.log(res)
                this.videoDataList = res
              })
          })
      })        
    }
  }


  toggleLiveCLassData() {
    this.showLiveCLassData = !this.showLiveCLassData
  }

}
