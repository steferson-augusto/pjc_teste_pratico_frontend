import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AlbumsComponent } from './pages/albums/albums.component'
import { ArtistsComponent } from './pages/artists/artists.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { UsersComponent } from './pages/users/users.component'
import { NavbarComponent } from './components/template/navbar/navbar.component'

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'artists', component: ArtistsComponent },
      { path: 'albums', component: AlbumsComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
