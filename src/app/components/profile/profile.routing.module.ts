import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ProfileComponent } from 'src/app/pages/profile/profile.component'

const profileRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', component: ProfileComponent, data: { title: 'Perfil' } }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
