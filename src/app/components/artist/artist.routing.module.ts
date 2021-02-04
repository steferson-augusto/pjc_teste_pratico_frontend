import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { ArtistsComponent } from 'src/app/pages/artists/artists.component'
import { ArtistDetailsComponent } from './artist-details/artist-details.component'

const artistRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', component: ArtistsComponent, data: { title: 'Artistas' } },
      { path: ':id', component: ArtistDetailsComponent, data: { title: 'Artista' } }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(artistRoutes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule {}
