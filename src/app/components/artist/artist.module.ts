import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgxErrorsModule } from '@ngspot/ngx-errors'
import { LottieModule } from 'ngx-lottie'

import { MaterialModule } from 'src/app/material/material.module'
import { TemplateModule } from '../template/template.module'
import { ArtistRoutingModule } from './artist.routing.module'
import { ArtistService } from './artist.service'
import { ArtistsComponent } from 'src/app/pages/artists/artists.component'
import { ArtistListComponent } from './artist-list/artist-list.component'
import { ArtistCreateComponent, DialogArtistCreate } from './artist-create/artist-create.component'
import { ArtistDetailsComponent } from './artist-details/artist-details.component'

export function playerFactory () {
  return import('lottie-web')
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ArtistRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxErrorsModule,
    TemplateModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [],
  declarations: [
    ArtistsComponent,
    ArtistListComponent,
    ArtistCreateComponent,
    DialogArtistCreate,
    ArtistDetailsComponent
  ],
  providers: [
    ArtistService
  ]
})
export class ArtistModule { }
