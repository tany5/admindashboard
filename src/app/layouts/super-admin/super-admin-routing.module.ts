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
import { PreviousyeartestComponent }  from 'src/app/pages/super_admin/testmanager/previousyeartest/previousyeartest.component'
import { EditpreviousyeartestComponent } from 'src/app/pages/super_admin/testmanager/previousyeartest/editpreviousyeartest/editpreviousyeartest.component';
import { AddcourseComponent } from 'src/app/pages/super_admin/addcourse/addcourse.component';
import { EditcourseComponent } from 'src/app/pages/super_admin/addcourse/editcourse/editcourse.component';
import { AddparentcategoryComponent } from 'src/app/pages/super_admin/addcourse/addparentcategory/addparentcategory.component';

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
        component: AddliveclassvideoComponent
      },
      {
        path: 'editliveliveclass',
        component: EditliveclassComponent
      },
      {
        path: 'addvideocourse',
        component: AddvideocourseComponent
      },
      {
        path: 'addvideocategory',
        component: AddvideocategoryComponent
      },

      {
        path: 'addvideochapter',
        component: AddvideochapterComponent
      },

      {
        path: 'addvideosubject',
        component: AddvideosubjectComponent
      },

      {
        path: 'addvideoproduct',
        component: AddvideoproductComponent
      },

      {
        path: 'smallquiz',
        component: SmallquizComponent,

      },
      {
        path: "small_cat",
        component: AddsmallquizcategoryComponent
      },
      {
        path: 'small_sub_cat',
        component: AddsmallquizchildcategoryComponent
      },
      {
        path: 'add_small_quiz_chapter',
        component: AddsmallquizchapterComponent
      },
      {
        path: 'add_daily_quiz',
        component: AdddailyquizComponent
      },
      {
        path: 'add_small_quiz',
        component: AddsmallquizComponent
      },
      {
        path: 'edit_daily_quiz/:prodId',
        component: EditdailyquizComponent
      },

      {
        path: 'edit_daily_quiz_question/:prodId',
        component: EditdailyquizquestionComponent
      },
      {
        path: 'edit_small_quiz_chapter/:prodId',
        component: EditsmallquizchapterComponent
      },
      {
        path: 'edit_small_quiz/:prodId',
        component: EditsmallquizComponent
      },
      {
        path: 'edit_small_quiz_question/:prodId',
        component: EditsmallquizquestionComponent
      },
      {
        path: 'fulllengthtest',
        component: FulllengthtestComponent
      },
      {
        path: 'addfulllengthtest',
        component: AddfulllengthtestComponent
      },
      {
        path: 'editfulllengthtest/:prodId',
        component: EditfulllengthtestComponent
      },
      {
        path: 'addfulllengthtestquestion/:prodId',
        component: AddfulllengthtestquestionComponent
      },
      {
        path: 'editfulllengthtestquestion/:prodId',
        component: EditfulllengthtestquestionComponent
      },
      {
        path: 'sectionaltest',
        component: SectionaltestComponent
      },
      {
        path: 'addsectionaltest',
        component: AddsectionaltestComponent
      },
      {
        path: 'editsectionaltest/:prodId',
        component: EditsectionaltestComponent
      },
      {
        path: 'addpreviousyeartest',
        component: AddpreviousyeartestComponent
      },
      {
        path: 'previousyeartest',
        component: PreviousyeartestComponent
      },
      {
        path: 'editpreviousyeartest/:prodId',
        component: EditpreviousyeartestComponent
      },
      {
        path: 'addcoursemaincourse',
        component: AddcourseComponent
      },
      {
        path: 'editcourse/:prodId',
        component: EditcourseComponent
      },
      {
        path: 'addparentcategory',
        component: AddparentcategoryComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
