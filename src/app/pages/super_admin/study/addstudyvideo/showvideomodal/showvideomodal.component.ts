import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-showvideomodal',
  templateUrl: './showvideomodal.component.html',
  styleUrls: ['./showvideomodal.component.scss']
})
export class ShowvideomodalComponent implements OnInit {
  videoUrl: any
  getvideoId: boolean = false
  constructor(private dialogRef: MatDialogRef<ShowvideomodalComponent>, @Inject(MAT_DIALOG_DATA) private data: any,private  sanitizer: DomSanitizer) { 
    console.log(data)
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${data.study_vdo_code}?autoplay=0`)

    console.log(this.videoUrl)

    this.getvideoId = true
    
  }

  ngOnInit(): void {
  }



  closeDialog() {
   this.dialogRef.close()
  }

}
