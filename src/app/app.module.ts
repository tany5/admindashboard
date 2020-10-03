import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperAdminModule } from './layouts/super-admin/super-admin.module'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ MaterialModule } from './material/material.module'
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { AddliveclassvideomodalComponent } from './pages/addliveclassvideomodal/addliveclassvideomodal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EditliveclassmodalComponent } from './pages/editliveclassmodal/editliveclassmodal.component';
import { EditcoursemodalComponent } from './pages/editcoursemodal/editcoursemodal.component';
import { EditsmallquizcategoryComponent } from './pages/super_admin/smallquiz/addsmallquizcategory/editsmallquizcategory/editsmallquizcategory.component';
import { EditsmallquizchildcategoryComponent } from './pages/super_admin/smallquiz/addsmallquizchildcategory/editsmallquizchildcategory/editsmallquizchildcategory.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddliveclassvideomodalComponent,
    EditliveclassmodalComponent,
    EditcoursemodalComponent,
    EditsmallquizcategoryComponent,
    EditsmallquizchildcategoryComponent,
                 
  ],
  imports: [
  BrowserModule.withServerTransition({ appId: 'serverApp' }),
  AppRoutingModule,
  SuperAdminModule,
  RouterModule,
  BrowserAnimationsModule,
  MaterialModule,
  AngularEditorModule ,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  NgxMaterialTimepickerModule,
  PdfViewerModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddliveclassvideomodalComponent, EditliveclassmodalComponent, EditcoursemodalComponent, EditsmallquizcategoryComponent, EditsmallquizchildcategoryComponent]
})
export class AppModule { }
