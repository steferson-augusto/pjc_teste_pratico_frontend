import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgxErrorsModule } from '@ngspot/ngx-errors'
import { LottieModule } from 'ngx-lottie'

import { MaterialModule } from 'src/app/material/material.module'
import { TemplateModule } from '../template/template.module'
import { ProfileRoutingModule } from './profile.routing.module'
import { ProfileComponent } from 'src/app/pages/profile/profile.component'
import { ProfileEditComponent } from './profile-edit/profile.component'
import { DialogChangePasswordComponent } from './dialog-change-password/dialog-change-password.component'
import { ProfileService } from './profile.service'

export function playerFactory () {
  return import('lottie-web')
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxErrorsModule,
    TemplateModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [],
  declarations: [
    ProfileComponent,
    ProfileEditComponent,
    DialogChangePasswordComponent
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule { }
