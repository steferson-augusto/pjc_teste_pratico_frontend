import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgxErrorsModule } from '@ngspot/ngx-errors'
import { CarouselModule } from 'ngx-owl-carousel-o'

import { AlbumRoutingModule } from './album.routing.module'
import { AlbumService } from './album.service'
import { AlbumsComponent } from 'src/app/pages/albums/albums.component'
import { AlbumListComponent } from './album-list/album-list.component'
import { AlbumCreateComponent, DialogAlbumCreate } from './album-create/album-create.component'
import { AlbumDetailsComponent } from './album-details/album-details.component'
import { ImageListComponent } from '../image/image-list/image-list.component'
import { ImageService } from '../image/image.service'
import { MaterialModule } from 'src/app/material/material.module'
import { TemplateModule } from '../template/template.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlbumRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxErrorsModule,
    CarouselModule,
    TemplateModule
  ],
  exports: [],
  declarations: [
    AlbumsComponent,
    AlbumListComponent,
    AlbumCreateComponent,
    DialogAlbumCreate,
    AlbumDetailsComponent,
    ImageListComponent
  ],
  providers: [
    AlbumService,
    ImageService
  ]
})
export class AlbumModule { }
