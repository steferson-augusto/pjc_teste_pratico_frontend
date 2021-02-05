import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { MaterialModule } from 'src/app/material/material.module'
import { LoadingComponent } from '../template/loading/loading.component'
import { CustomSnackbarService } from './custom-snackbar/custom-snackbar.service'
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component'
import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    CustomSnackbarComponent,
    LoadingComponent,
    NavbarComponent
  ],
  exports: [
    CustomSnackbarComponent,
    LoadingComponent,
    NavbarComponent
  ],
  providers: [
    CustomSnackbarService
  ]
})
export class TemplateModule { }
