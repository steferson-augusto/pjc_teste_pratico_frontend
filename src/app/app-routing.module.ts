import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from './pages/auth/auth.guard'
import { NavbarComponent } from './components/template/navbar/navbar.component'
import { AuthComponent } from './pages/auth/auth.component'

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: '', redirectTo: '/albums', pathMatch: 'full' },
      {
        path: 'profile',
        loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'artists',
        loadChildren: () => import('./components/artist/artist.module').then(m => m.ArtistModule),
        canLoad: [AuthGuard]
      },
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
