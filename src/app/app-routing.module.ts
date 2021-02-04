import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './pages/auth/auth.guard'
// import { AlbumsComponent } from './pages/albums/albums.component'
import { ArtistsComponent } from './pages/artists/artists.component'
import { NavbarComponent } from './components/template/navbar/navbar.component'
import { AuthComponent } from './pages/auth/auth.component'
import { ArtistDetailsComponent } from './components/artist/artist-details/artist-details.component'
// import { AlbumDetailsComponent } from './components/album/album-details/album-details.component'
import { ProfileComponent } from './pages/profile/profile.component'

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', redirectTo: '/albums', pathMatch: 'full' },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },
      { path: 'artists', component: ArtistsComponent, data: { title: 'Artistas' } },
      { path: 'artists/:id', component: ArtistDetailsComponent, data: { title: 'Artista' } },
      {
        path: 'albums',
        loadChildren: () => import('./components/album/album.module').then(m => m.AlbumModule),
        canLoad: [AuthGuard]
      }
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
