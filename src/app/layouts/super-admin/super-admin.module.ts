import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminComponent } from './super-admin.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'
import { SuperAdmindashboardComponent } from 'src/app/pages/super_admin/super-admindashboard/super-admindashboard.component';
import { SuperAdminaddcourseComponent } from 'src/app/pages/super_admin/super-adminaddcourse/super-adminaddcourse.component';
import { AddliveclassvideoComponent } from 'src/app/pages/super_admin/addliveclassvideo/addliveclassvideo.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditliveclassComponent } from './../../pages/super_admin/editliveclass/editliveclass.component';
import { AddvideocourseComponent } from './../../pages/super_admin/addvideocourse/addvideocourse.component';
import { AddvideochapterComponent } from 'src/app/pages/super_admin/addvideochapter/addvideochapter.component';
import { SmallquizComponent } from './../../pages/super_admin/smallquiz/smallquiz.component';
import { AddsmallquizcategoryComponent } from './../../pages/super_admin/smallquiz/addsmallquizcategory/addsmallquizcategory.component';
import { AddsmallquizchildcategoryComponent } from './../../pages/super_admin/smallquiz/addsmallquizchildcategory/addsmallquizchildcategory.component';
import { AddsmallquizchapterComponent } from './../../pages/super_admin/smallquiz/addsmallquizchapter/addsmallquizchapter.component';
import { AdddailyquizComponent } from './../../pages/super_admin/smallquiz/adddailyquiz/adddailyquiz.component';
import { AddsmallquizComponent } from './../../pages/super_admin/smallquiz/addsmallquiz/addsmallquiz.component';
import { ChartsModule } from 'ng2-charts';
import { EditdailyquizComponent } from './../../pages/super_admin/smallquiz/adddailyquiz/editdailyquiz/editdailyquiz.component';
import { EditdailyquizquestionComponent } from 'src/app/pages/super_admin/smallquiz/adddailyquiz/editdailyquiz/editdailyquizquestion/editdailyquizquestion.component';
import { EditsmallquizchapterComponent } from './../../pages/super_admin/smallquiz/addsmallquizchapter/editsmallquizchapter/editsmallquizchapter.component';
import { EditsmallquizComponent } from './../../pages/super_admin/smallquiz/addsmallquiz/editsmallquiz/editsmallquiz.component';
import { EditsmallquizquestionComponent } from './../../pages/super_admin/smallquiz/addsmallquiz/editsmallquiz/editsmallquizquestion/editsmallquizquestion.component';
import { FulllengthtestComponent } from './../../pages/super_admin/testmanager/fulllengthtest/fulllengthtest.component';
import { AddfulllengthtestComponent } from './../../pages/super_admin/testmanager/fulllengthtest/addfulllengthtest/addfulllengthtest.component';
import { EditfulllengthtestComponent } from './../../pages/super_admin/testmanager/fulllengthtest/editfulllengthtest/editfulllengthtest.component';
import { EditfulllengthtestquestionComponent } from './../../pages/super_admin/testmanager/fulllengthtest/editfulllengthtestquestion/editfulllengthtestquestion.component';
import { AddfulllengthtestquestionComponent } from './../../pages/super_admin/testmanager/fulllengthtest/addfulllengthtestquestion/addfulllengthtestquestion.component';
import { SectionaltestComponent } from './../../pages/super_admin/testmanager/sectionaltest/sectionaltest.component';
import { AddsectionaltestComponent } from './../../pages/super_admin/testmanager/sectionaltest/addsectionaltest/addsectionaltest.component';
import { EditsectionaltestComponent } from './../../pages/super_admin/testmanager/sectionaltest/editsectionaltest/editsectionaltest.component';
import { AddpreviousyeartestComponent } from './../../pages/super_admin/testmanager/previousyeartest/addpreviousyeartest/addpreviousyeartest.component';
import { PreviousyeartestComponent } from 'src/app/pages/super_admin/testmanager/previousyeartest/previousyeartest.component';
import { EditpreviousyeartestComponent } from './../../pages/super_admin/testmanager/previousyeartest/editpreviousyeartest/editpreviousyeartest.component';
import { AddcourseComponent } from './../../pages/super_admin/addcourse/addcourse.component';
import { EditcourseComponent } from './../../pages/super_admin/addcourse/editcourse/editcourse.component';
import { AddparentcategoryComponent } from './../../pages/super_admin/addcourse/addparentcategory/addparentcategory.component';

@NgModule({
  declarations: [
    SuperAdminComponent,
    SuperAdmindashboardComponent,
    SuperAdminaddcourseComponent,
    AddliveclassvideoComponent,
    EditliveclassComponent,
    AddvideocourseComponent,
    AddvideochapterComponent,
    SmallquizComponent,
    AddsmallquizcategoryComponent,
    AddsmallquizchildcategoryComponent,
    AddsmallquizchapterComponent,
    AdddailyquizComponent,
    AddsmallquizComponent,
    EditdailyquizComponent,
    EditdailyquizquestionComponent,
    EditsmallquizchapterComponent,
    EditsmallquizComponent,
    EditsmallquizquestionComponent,
    FulllengthtestComponent,
    AddfulllengthtestComponent,
    EditfulllengthtestComponent,
    EditfulllengthtestquestionComponent,
    AddfulllengthtestquestionComponent,
    SectionaltestComponent,
    AddsectionaltestComponent,
    EditsectionaltestComponent,
    PreviousyeartestComponent,
    AddpreviousyeartestComponent,
    EditpreviousyeartestComponent,
    AddcourseComponent,
    EditcourseComponent,
    AddparentcategoryComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    CommonModule,
    SharedModule,
    RouterModule,
    MaterialModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    PdfViewerModule,
    ChartsModule
  ]
})
export class SuperAdminModule { }
