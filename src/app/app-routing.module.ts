import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './pages/auth/auth.guard'
import { AlbumsComponent } from './pages/albums/albums.component'
import { ArtistsComponent } from './pages/artists/artists.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { UsersComponent } from './pages/users/users.component'
import { NavbarComponent } from './components/template/navbar/navbar.component'
import { AuthComponent } from './pages/auth/auth.component'
import { ArtistDetailsComponent } from './components/artist/artist-details/artist-details.component'

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'artists', component: ArtistsComponent },
      { path: 'artists/:id', component: ArtistDetailsComponent },
      { path: 'albums', component: AlbumsComponent }
    ],
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
