import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';
import { SuperAdmindashboardComponent } from '../../pages/super_admin/super-admindashboard/super-admindashboard.component';
import { SuperAdminaddcourseComponent } from '../../pages/super_admin/super-adminaddcourse/super-adminaddcourse.component';
import { LoginComponent } from '../../pages/login/login.component';
import { SuperadminGuard } from '../../superadmin/superadmin.guard'
import { AddliveclassvideoComponent } from '../../pages/super_admin/addliveclassvideo/addliveclassvideo.component';
import { EditliveclassComponent } from './../../pages/super_admin/editliveclass/editliveclass.component';
import { AddvideocourseComponent } from 'src/app/pages/super_admin/addvideocourse/addvideocourse.component';
import { AddvideocategoryComponent } from './../../pages/super_admin/addvideocategory/addvideocategory.component';
import { AddvideochapterComponent } from './../../pages/super_admin/addvideochapter/addvideochapter.component';
import { AddvideosubjectComponent } from './../../pages/super_admin/addvideosubject/addvideosubject.component';
import { AddvideoproductComponent } from './../../pages/super_admin/addvideoproduct/addvideoproduct.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SmallquizComponent } from './../../pages/super_admin/smallquiz/smallquiz.component';
import { AddsmallquizcategoryComponent } from './../../pages/super_admin/smallquiz/addsmallquizcategory/addsmallquizcategory.component';
import { AddsmallquizchildcategoryComponent } from './../../pages/super_admin/smallquiz/addsmallquizchildcategory/addsmallquizchildcategory.component';
import { AddsmallquizchapterComponent } from './../../pages/super_admin/smallquiz/addsmallquizchapter/addsmallquizchapter.component';
import { AdddailyquizComponent } from './../../pages/super_admin/smallquiz/adddailyquiz/adddailyquiz.component';
import { AddsmallquizComponent } from 'src/app/pages/super_admin/smallquiz/addsmallquiz/addsmallquiz.component';
import { EditdailyquizComponent } from 'src/app/pages/super_admin/smallquiz/adddailyquiz/editdailyquiz/editdailyquiz.component';
import { EditdailyquizquestionComponent } from './../../pages/super_admin/smallquiz/adddailyquiz/editdailyquiz/editdailyquizquestion/editdailyquizquestion.component';
import { EditsmallquizchapterComponent } from 'src/app/pages/super_admin/smallquiz/addsmallquizchapter/editsmallquizchapter/editsmallquizchapter.component';
import { EditsmallquizComponent } from 'src/app/pages/super_admin/smallquiz/addsmallquiz/editsmallquiz/editsmallquiz.component';
import { EditsmallquizquestionComponent } from 'src/app/pages/super_admin/smallquiz/addsmallquiz/editsmallquiz/editsmallquizquestion/editsmallquizquestion.component';
import { FulllengthtestComponent } from './../../pages/super_admin/testmanager/fulllengthtest/fulllengthtest.component';
import { AddfulllengthtestComponent } from './../../pages/super_admin/testmanager/fulllengthtest/addfulllengthtest/addfulllengthtest.component';
import { EditfulllengthtestComponent } from './../../pages/super_admin/testmanager/fulllengthtest/editfulllengthtest/editfulllengthtest.component';
import { AddfulllengthtestquestionComponent } from './../../pages/super_admin/testmanager/fulllengthtest/addfulllengthtestquestion/addfulllengthtestquestion.component';
import { EditfulllengthtestquestionComponent } from 'src/app/pages/super_admin/testmanager/fulllengthtest/editfulllengthtestquestion/editfulllengthtestquestion.component';
import { SectionaltestComponent } from './../../pages/super_admin/testmanager/sectionaltest/sectionaltest.component';
import { AddsectionaltestComponent } from './../../pages/super_admin/testmanager/sectionaltest/addsectionaltest/addsectionaltest.component';
import { EditsectionaltestComponent } from 'src/app/pages/super_admin/testmanager/sectionaltest/editsectionaltest/editsectionaltest.component';
import { AddpreviousyeartestComponent } from 'src/app/pages/super_admin/testmanager/previousyeartest/addpreviousyeartest/addpreviousyeartest.component';
import { PreviousyeartestComponent } from 'src/app/pages/super_admin/testmanager/previousyeartest/previousyeartest.component'
import { EditpreviousyeartestComponent } from 'src/app/pages/super_admin/testmanager/previousyeartest/editpreviousyeartest/editpreviousyeartest.component';
import { AddcourseComponent } from 'src/app/pages/super_admin/addcourse/addcourse.component';
import { EditcourseComponent } from 'src/app/pages/super_admin/addcourse/editcourse/editcourse.component';
import { AddparentcategoryComponent } from 'src/app/pages/super_admin/addcourse/addparentcategory/addparentcategory.component';
import { EditparentcategoryComponent } from 'src/app/pages/super_admin/addcourse/addparentcategory/editparentcategory/editparentcategory.component';
import { AddsubcourseComponent } from 'src/app/pages/super_admin/addcourse/addsubcourse/addsubcourse.component';
import { EditsubcourseComponent } from 'src/app/pages/super_admin/addcourse/addsubcourse/editsubcourse/editsubcourse.component';
import { AddsubcoursecategoryComponent } from 'src/app/pages/super_admin/addcourse/addsubcoursecategory/addsubcoursecategory.component';
import { EditsubcoursecategoryComponent } from 'src/app/pages/super_admin/addcourse/addsubcoursecategory/editsubcoursecategory/editsubcoursecategory.component';
import { AddcoursesectionComponent } from 'src/app/pages/super_admin/addcourse/addcoursesection/addcoursesection.component';
import { EditcoursesectionComponent } from 'src/app/pages/super_admin/addcourse/addcoursesection/editcoursesection/editcoursesection.component';
import { StudentsectionComponent } from 'src/app/pages/super_admin/studentsection/studentsection.component';
import { AddstudentComponent } from 'src/app/pages/super_admin/studentsection/addstudent/addstudent.component';
import { EditstudentComponent } from 'src/app/pages/super_admin/studentsection/editstudent/editstudent.component';
import { UpdatepasswordComponent } from 'src/app/pages/super_admin/studentsection/updatepassword/updatepassword.component';
import { AsigncouponComponent } from './../../pages/super_admin/studentsection/asigncoupon/asigncoupon.component';
import { GeneratecouponComponent } from 'src/app/pages/super_admin/settings/generatecoupon/generatecoupon.component';
import { AddconceptComponent } from 'src/app/pages/super_admin/study/addconcept/addconcept.component';
import { EditconceptComponent } from 'src/app/pages/super_admin/study/addconcept/editconcept/editconcept.component';
import { AddstudyvideoComponent } from 'src/app/pages/super_admin/study/addstudyvideo/addstudyvideo.component';
import { EditstudyvideoComponent } from 'src/app/pages/super_admin/study/addstudyvideo/editstudyvideo/editstudyvideo.component';
import { ReorderconceptComponent } from './../../pages/super_admin/study/reorderconcept/reorderconcept.component';
import { PostapprovalComponent } from './../../pages/super_admin/discusssection/postapproval/postapproval.component'
import { AddproductComponent } from 'src/app/pages/super_admin/product/addproduct/addproduct.component';
import { EditproductComponent } from 'src/app/pages/super_admin/product/editproduct/editproduct.component';
import { LivetestComponent } from 'src/app/pages/super_admin/othersection/livetest/livetest.component';
import { EditvideocourseComponent } from 'src/app/pages/super_admin/addvideocourse/editvideocourse/editvideocourse.component';
import { AddvideobyproductidComponent } from 'src/app/pages/super_admin/addvideocourse/addvideobyproductid/addvideobyproductid.component';
import { EditvideobyproductidComponent } from 'src/app/pages/super_admin/addvideocourse/editvideobyproductid/editvideobyproductid.component';
import { EditvideosubjectComponent } from 'src/app/pages/super_admin/addvideosubject/editvideosubject/editvideosubject.component';
import { AddvideocategoryService } from 'src/app/pages/super_admin/addvideocategory/addvideocategory.service';
import { EditvideocategoryComponent } from 'src/app/pages/super_admin/addvideocategory/editvideocategory/editvideocategory.component';
import { AddparentsubjectComponent } from 'src/app/pages/super_admin/settings/addparentsubject/addparentsubject.component';
import { EditparentsubjectComponent } from 'src/app/pages/super_admin/settings/addparentsubject/editparentsubject/editparentsubject.component';
import { AddchapterComponent } from 'src/app/pages/super_admin/settings/addchapter/addchapter.component';

import { EditchapterComponent } from './../../pages/super_admin/settings/addchapter/editchapter/editchapter.component';
import { AddsubchapterComponent } from 'src/app/pages/super_admin/settings/addsubchapter/addsubchapter.component';
import { EditsubchapterComponent } from 'src/app/pages/super_admin/settings/addsubchapter/editsubchapter/editsubchapter.component';

import { AddsubjectComponent } from './../../pages/super_admin/settings/addsubject/addsubject.component'
import { EditsubjectComponent } from './../../pages/super_admin/settings/addsubject/editsubject/editsubject.component'
import { AddteacherComponent } from 'src/app/pages/super_admin/settings/addteacher/addteacher.component';
import { AddbannerComponent } from 'src/app/pages/super_admin/settings/addbanner/addbanner.component';
import { EditbannerComponent } from 'src/app/pages/super_admin/settings/addbanner/editbanner/editbanner.component';
import { EditteacherComponent } from 'src/app/pages/super_admin/settings/addteacher/editteacher/editteacher.component';
import { AddyoutubevideoComponent } from 'src/app/pages/super_admin/settings/addyoutubevideo/addyoutubevideo.component';
import { EdityoutubevideoComponent } from 'src/app/pages/super_admin/settings/addyoutubevideo/edityoutubevideo/edityoutubevideo.component';
import { TestimonialComponent } from 'src/app/pages/super_admin/settings/testimonial/testimonial.component';
import { EdittestimonialComponent } from 'src/app/pages/super_admin/settings/testimonial/edittestimonial/edittestimonial.component';
import { ReordertrendingtestComponent } from 'src/app/pages/super_admin/settings/reordertrendingtest/reordertrendingtest.component';
import { AddsubcoursecategorydescriptionComponent } from 'src/app/pages/super_admin/addcourse/addsubcoursecategory/addsubcoursecategorydescription/addsubcoursecategorydescription.component';
import { AddquestionbankquestionComponent } from 'src/app/pages/super_admin/questionbank/addquestionbankquestion/addquestionbankquestion.component';
import { ViewquestionbankquestionComponent } from 'src/app/pages/super_admin/questionbank/viewquestionbankquestion/viewquestionbankquestion.component';
import { EditquestionbankquestionComponent } from 'src/app/pages/super_admin/questionbank/editquestionbankquestion/editquestionbankquestion.component';


const routes: Routes = [
  {
    path: 'superadmin',
    component: SuperAdminComponent,
    children: [
      {
        path: '',
        component: SuperAdmindashboardComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'dashboard',
        component: SuperAdmindashboardComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addcourse',
        component: SuperAdminaddcourseComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },

      {
        path: 'addliveclassvideo',
        component: AddliveclassvideoComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editliveliveclass',
        component: EditliveclassComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addvideocourse',
        component: AddvideocourseComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addvideocategory',
        component: AddvideocategoryComponent,
        canActivate: [SuperadminGuard]
      },

      {
        path: 'addvideochapter',
        component: AddvideochapterComponent,
        canActivate: [SuperadminGuard]
      },

      {
        path: 'addvideosubject',
        component: AddvideosubjectComponent,
        canActivate: [SuperadminGuard]
      },

      {
        path: 'addvideoproduct',
        component: AddvideoproductComponent,
        canActivate: [SuperadminGuard]
      },

      {
        path: 'smallquiz',
        component: SmallquizComponent,
        canActivate: [SuperadminGuard]

      },
      {
        path: "small_cat",
        component: AddsmallquizcategoryComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'small_sub_cat',
        component: AddsmallquizchildcategoryComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'add_small_quiz_chapter',
        component: AddsmallquizchapterComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'add_daily_quiz',
        component: AdddailyquizComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'add_small_quiz',
        component: AddsmallquizComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'edit_daily_quiz/:prodId',
        component: EditdailyquizComponent,
        canActivate: [SuperadminGuard]
      },

      {
        path: 'edit_daily_quiz_question/:prodId',
        component: EditdailyquizquestionComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'edit_small_quiz_chapter/:prodId',
        component: EditsmallquizchapterComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'edit_small_quiz/:prodId',
        component: EditsmallquizComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'edit_small_quiz_question/:prodId',
        component: EditsmallquizquestionComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'fulllengthtest',
        component: FulllengthtestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addfulllengthtest',
        component: AddfulllengthtestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editfulllengthtest/:prodId',
        component: EditfulllengthtestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addfulllengthtestquestion/:prodId',
        component: AddfulllengthtestquestionComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editfulllengthtestquestion/:prodId',
        component: EditfulllengthtestquestionComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'sectionaltest',
        component: SectionaltestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addsectionaltest',
        component: AddsectionaltestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editsectionaltest/:prodId',
        component: EditsectionaltestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addpreviousyeartest',
        component: AddpreviousyeartestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'previousyeartest',
        component: PreviousyeartestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editpreviousyeartest/:prodId',
        component: EditpreviousyeartestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addcoursemaincourse',
        component: AddcourseComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editcourse/:prodId',
        component: EditcourseComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addparentcategory',
        component: AddparentcategoryComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editparentcategory/:prodId',
        component: EditparentcategoryComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addsubcourse',
        component: AddsubcourseComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editsubcourse/:prodId',
        component: EditsubcourseComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addsubcoursecategory',
        component: AddsubcoursecategoryComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editsubcoursecategory/:prodId',
        component: EditsubcoursecategoryComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addsubcoursecategorydesc/:prodId/:sub_category_name',
        component: AddsubcoursecategorydescriptionComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addcoursesection',
        component: AddcoursesectionComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editcoursesection/:prodId',
        component: EditcoursesectionComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'studentsection',
        component: StudentsectionComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addstudent',
        component: AddstudentComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editstudent/:prodId',
        component: EditstudentComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'updatepassword/:prodId',
        component: UpdatepasswordComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'asigncoupon',
        component: AsigncouponComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'generatecoupon',
        component: GeneratecouponComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addconcept',
        component: AddconceptComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editconcept/:prodId',
        component: EditconceptComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addstudyvideo',
        component: AddstudyvideoComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editstudyvideo/:prodId',
        component: EditstudyvideoComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'reorderconcept',
        component: ReorderconceptComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'postapproval',
        component: PostapprovalComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addproduct',
        component: AddproductComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'eidtproduct/:prodId',
        component: EditproductComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'livetest',
        component: LivetestComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'eidtvideocourse/:prodId',
        component: EditvideocourseComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addvideoproductbyid/:prodId',
        component: AddvideobyproductidComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editvideoproductbyid/:prodId',
        component: EditvideobyproductidComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editvideosubject/:prodId',
        component: EditvideosubjectComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addvideocategory',
        component: AddvideocategoryService,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editvideocategory/:prodId',
        component: EditvideocategoryComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addparentsubject',
        component: AddparentsubjectComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editparentsubject/:prodId',
        component: EditparentsubjectComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addchapter',
        component: AddchapterComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editchapter/:prodId',
        component: EditchapterComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addsubchapter',
        component: AddsubchapterComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editsubchapter/:prodId',
        component: EditsubchapterComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addsubject',
        component: AddsubjectComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editsubject/:prodId',
        component: EditsubjectComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addteacher',
        component: AddteacherComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editteacher/:prodId',
        component: EditteacherComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addbanner',
        component: AddbannerComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'editbanner/:prodId/:prodType',
        component: EditbannerComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addyoutubevideo',
        component: AddyoutubevideoComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'edityoutubevideo/:prodId',
        component: EdityoutubevideoComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'addtestimonial',
        component: TestimonialComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'edittestimonial/:prodId',
        component: EdittestimonialComponent,
        canActivate: [SuperadminGuard]
      },
      {
        path: 'reordertrendingtest',
        component: ReordertrendingtestComponent,
        canActivate: [SuperadminGuard]
      }, 
      {
        path:'addquestion',
        component: AddquestionbankquestionComponent,
        canActivate: [SuperadminGuard]
      }, 
      {
        path:'viewquestionbankquestion',
        component: ViewquestionbankquestionComponent,
        canActivate: [SuperadminGuard]
      },
       
      {
        path:'editquestionbankquestion/:prodId',
        component: EditquestionbankquestionComponent,
        canActivate: [SuperadminGuard]
      }

      

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule],
exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
