import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatSidenavModule} from '@angular/material/sidenav'
import { MatDividerModule} from '@angular/material/divider'
import {MatMenuModule} from '@angular/material/menu'
import {MatListModule} from '@angular/material/list'
import {MatDialogModule} from '@angular/material/dialog'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatSelectModule} from '@angular/material/select'
import {MatTabsModule} from '@angular/material/tabs';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatDividerModule,
  MatMenuModule,
  MatListModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSelectModule,
  MatTabsModule,
  FormsModule,  
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatBadgeModule
]
@NgModule({

  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class MaterialModule { }