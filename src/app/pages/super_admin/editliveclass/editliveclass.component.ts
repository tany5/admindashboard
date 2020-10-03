import { Component, OnInit } from '@angular/core';
import { EditliveclassService } from './editliveclass.service';
import { EditcoursemodalComponent } from './../../editcoursemodal/editcoursemodal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editliveclass',
  templateUrl: './editliveclass.component.html',
  styleUrls: ['./editliveclass.component.scss']
})
export class EditliveclassComponent implements OnInit {

  liveClassList: any = []
  live_class_meta_id: any 

  displayedColumns: string[] = ['id', 'live_class_title', 'action'];

  constructor(private editLiveClass: EditliveclassService, private dialog: MatDialog, private snackbar: MatSnackBar) { 

    this.editLiveClass.getLiveClassData().subscribe(
      (res) => {
        console.log(res)
        this.liveClassList = res
        
      })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.liveClassList.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
  }


  openDialog(live_class_meta_id) {   
    
    const dialogRef = this.dialog.open(EditcoursemodalComponent, {
      width: '100%',
      disableClose: true,
      height: '80vh',      
      data: {  live_class_meta_id: live_class_meta_id}
    });

    dialogRef.afterClosed().subscribe(
     (res)=> {
      location.reload()
     }
    )
  }


  deleteLiveClass(live_class_meta_id, product_id) {

    let result = confirm("Are you want to delete ?")
    if(result) {
      this.editLiveClass.deleteLiveClassDetails(live_class_meta_id, product_id).subscribe(
        (res)=> {
          console.log(res)
         let snackBarRef = this.snackbar.open("Deleted Succesfully !!", "CLose", {
            duration: 2000,
          });
  
          snackBarRef.afterDismissed().subscribe(()=> {
            location.reload()
          })
        })  
    }
      
  }

}
