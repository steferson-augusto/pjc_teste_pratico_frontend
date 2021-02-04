import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AlbumDetailsComponent } from './album-details/album-details.component'
import { AlbumsComponent } from 'src/app/pages/albums/albums.component'

const albumRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', pathMatch: 'full', component: AlbumsComponent, data: { title: 'Álbuns' } },
      { path: ':id', component: AlbumDetailsComponent, data: { title: 'Álbum' } }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(albumRoutes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule {}
