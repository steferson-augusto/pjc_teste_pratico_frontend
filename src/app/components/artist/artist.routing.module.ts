import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ArtistsComponent } from 'src/app/pages/artists/artists.component'
import { ArtistDetailsComponent } from './artist-details/artist-details.component'

const albumRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', component: ArtistsComponent, data: { title: 'Álbuns' } },
      { path: ':id', component: ArtistDetailsComponent, data: { title: 'Álbum' } }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(albumRoutes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule {}
