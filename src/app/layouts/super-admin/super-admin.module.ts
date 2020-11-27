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
import { EditparentcategoryComponent } from './../../pages/super_admin/addcourse/addparentcategory/editparentcategory/editparentcategory.component';
import { AddsubcourseComponent } from './../../pages/super_admin/addcourse/addsubcourse/addsubcourse.component';
import { EditsubcourseComponent } from './../../pages/super_admin/addcourse/addsubcourse/editsubcourse/editsubcourse.component';
import { AddsubcoursecategoryComponent } from './../../pages/super_admin/addcourse/addsubcoursecategory/addsubcoursecategory.component';
import { EditsubcoursecategoryComponent } from './../../pages/super_admin/addcourse/addsubcoursecategory/editsubcoursecategory/editsubcoursecategory.component';
import { AddcoursesectionComponent } from './../../pages/super_admin/addcourse/addcoursesection/addcoursesection.component';
import { EditcoursesectionComponent } from './../../pages/super_admin/addcourse/addcoursesection/editcoursesection/editcoursesection.component';
import { StudentsectionComponent } from './../../pages/super_admin/studentsection/studentsection.component';
import { AddstudentComponent } from './../../pages/super_admin/studentsection/addstudent/addstudent.component';
import { EditstudentComponent } from './../../pages/super_admin/studentsection/editstudent/editstudent.component';
import { UpdatepasswordComponent } from './../../pages/super_admin/studentsection/updatepassword/updatepassword.component';
import { AsigncouponComponent } from './../../pages/super_admin/studentsection/asigncoupon/asigncoupon.component';
import { GeneratecouponComponent } from './../../pages/super_admin/settings/generatecoupon/generatecoupon.component';
import { AddconceptComponent } from './../../pages/super_admin/study/addconcept/addconcept.component';
import { EditconceptComponent } from './../../pages/super_admin/study/addconcept/editconcept/editconcept.component';
import { AddstudyvideoComponent } from './../../pages/super_admin/study/addstudyvideo/addstudyvideo.component';
import { EditstudyvideoComponent } from './../../pages/super_admin/study/addstudyvideo/editstudyvideo/editstudyvideo.component';
import { ReorderconceptComponent } from 'src/app/pages/super_admin/study/reorderconcept/reorderconcept.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PostapprovalComponent } from './../../pages/super_admin/discusssection/postapproval/postapproval.component'
import { AddproductComponent } from './../../pages/super_admin/product/addproduct/addproduct.component'
import { EditproductComponent } from './../../pages/super_admin/product/editproduct/editproduct.component'
import { LivetestComponent } from './../../pages/super_admin/othersection/livetest/livetest.component'
import { AddvideoproductComponent } from 'src/app/pages/super_admin/addvideoproduct/addvideoproduct.component';
import { EditvideocourseComponent } from './../../pages/super_admin/addvideocourse/editvideocourse/editvideocourse.component'
import { AddvideobyproductidComponent } from 'src/app/pages/super_admin/addvideocourse/addvideobyproductid/addvideobyproductid.component';
import { EditvideobyproductidComponent } from 'src/app/pages/super_admin/addvideocourse/editvideobyproductid/editvideobyproductid.component'
import { AddvideosubjectComponent } from 'src/app/pages/super_admin/addvideosubject/addvideosubject.component';
import { EditvideosubjectComponent } from './../../pages/super_admin/addvideosubject/editvideosubject/editvideosubject.component'
import { AddvideocategoryComponent } from 'src/app/pages/super_admin/addvideocategory/addvideocategory.component';
import { EditvideocategoryComponent } from './../../pages/super_admin/addvideocategory/editvideocategory/editvideocategory.component'
import { AddparentsubjectComponent } from './../../pages/super_admin/settings/addparentsubject/addparentsubject.component'
import { EditparentsubjectComponent } from './../../pages/super_admin/settings/addparentsubject/editparentsubject/editparentsubject.component'
import { AddchapterComponent } from './../../pages/super_admin/settings/addchapter/addchapter.component'
import { EditchapterComponent } from 'src/app/pages/super_admin/settings/addchapter/editchapter/editchapter.component';
import { AddsubchapterComponent } from './../../pages/super_admin/settings/addsubchapter/addsubchapter.component'
import { EditsubchapterComponent } from './../../pages/super_admin/settings/addsubchapter/editsubchapter/editsubchapter.component'
import { AddsubjectComponent } from 'src/app/pages/super_admin/settings/addsubject/addsubject.component';
import { EditsubjectComponent } from 'src/app/pages/super_admin/settings/addsubject/editsubject/editsubject.component';
import { AddteacherComponent } from './../../pages/super_admin/settings/addteacher/addteacher.component'
import { AddbannerComponent } from './../../pages/super_admin/settings/addbanner/addbanner.component'
import { EditbannerComponent } from './../../pages/super_admin/settings/addbanner/editbanner/editbanner.component'
import { EditteacherComponent } from './../../pages/super_admin/settings/addteacher/editteacher/editteacher.component'
import { AddyoutubevideoComponent } from './../../pages/super_admin/settings/addyoutubevideo/addyoutubevideo.component'
import { EdityoutubevideoComponent } from './../../pages/super_admin/settings/addyoutubevideo/edityoutubevideo/edityoutubevideo.component'
import { TestimonialComponent } from './../../pages/super_admin/settings/testimonial/testimonial.component'
import { EdittestimonialComponent } from './../../pages/super_admin/settings/testimonial/edittestimonial/edittestimonial.component'
import { ReordertrendingtestComponent } from './../../pages/super_admin/settings//reordertrendingtest/reordertrendingtest.component'
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddsubcoursecategorydescriptionComponent } from './../../pages/super_admin/addcourse/addsubcoursecategory/addsubcoursecategorydescription/addsubcoursecategorydescription.component'
import { AddquestionbankquestionComponent } from './../../pages/super_admin/questionbank/addquestionbankquestion/addquestionbankquestion.component'
import { ViewquestionbankquestionComponent } from './../../pages/super_admin/questionbank/viewquestionbankquestion/viewquestionbankquestion.component'
import { EditquestionbankquestionComponent } from './../../pages/super_admin/questionbank/editquestionbankquestion/editquestionbankquestion.component'

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
    AddparentcategoryComponent,
    EditparentcategoryComponent,
    AddsubcourseComponent,
    EditsubcourseComponent,
    AddsubcoursecategoryComponent,
    EditsubcoursecategoryComponent,
    AddcoursesectionComponent,
    EditcoursesectionComponent,
    StudentsectionComponent,
    AddstudentComponent,
    EditstudentComponent,
    UpdatepasswordComponent,
    AsigncouponComponent,
    GeneratecouponComponent,
    AddconceptComponent,
    EditconceptComponent,
    AddstudyvideoComponent,
    EditstudyvideoComponent,
    ReorderconceptComponent,
    PostapprovalComponent,
    AddproductComponent,
    EditproductComponent,
    LivetestComponent,
    AddvideoproductComponent,
    EditvideocourseComponent,
    AddvideobyproductidComponent,
    EditvideobyproductidComponent,
    AddvideosubjectComponent,
    EditvideosubjectComponent,
    AddvideocategoryComponent,
    EditvideocategoryComponent,
    AddparentsubjectComponent,
    EditparentsubjectComponent,
    AddchapterComponent,
    EditchapterComponent,
    AddsubchapterComponent,
    EditsubchapterComponent,
    AddsubjectComponent,
    EditsubjectComponent,
    AddteacherComponent,
    AddbannerComponent,
    EditbannerComponent,
    EditteacherComponent,
    AddyoutubevideoComponent,
    EdityoutubevideoComponent,
    TestimonialComponent,
    EdittestimonialComponent,
    ReordertrendingtestComponent,
    AddsubcoursecategorydescriptionComponent,
    AddquestionbankquestionComponent,
    ViewquestionbankquestionComponent,
    EditquestionbankquestionComponent
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
    ChartsModule,
    DragDropModule,
    Ng2SearchPipeModule,
    CKEditorModule
  ]
})
export class SuperAdminModule { }
