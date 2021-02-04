import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxErrorsModule } from '@ngspot/ngx-errors'
import { CarouselModule } from 'ngx-owl-carousel-o'

import { AppRoutingModule } from './app-routing.module'
import { httpInterceptorProviders } from './helpers/http-interceptors'
import { MaterialModule, paginatorPtBr } from './material/material.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/template/navbar/navbar.component'
import { ArtistsComponent } from './pages/artists/artists.component'
import { AlbumsComponent } from './pages/albums/albums.component'
import { AuthComponent } from './pages/auth/auth.component'
import { ArtistListComponent } from './components/artist/artist-list/artist-list.component'
import { ArtistCreateComponent, DialogArtistCreate } from './components/artist/artist-create/artist-create.component'
import { CustomSnackbarComponent } from './components/template/custom-snackbar/custom-snackbar.component'
import { ArtistDetailsComponent } from './components/artist/artist-details/artist-details.component'
import { LoadingComponent } from './components/template/loading/loading.component'
import { AlbumListComponent } from './components/album/album-list/album-list.component'
import { AlbumCreateComponent, DialogAlbumCreate } from './components/album/album-create/album-create.component'
import { AlbumDetailsComponent } from './components/album/album-details/album-details.component'
import { ImageListComponent } from './components/image/image-list/image-list.component'
import { ProfileComponent as ProfilePageComponent } from './pages/profile/profile.component'
import { ProfileComponent } from './components/profile/profile.component'
import { DialogChangePasswordComponent } from './components/profile/dialog-change-password/dialog-change-password.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArtistsComponent,
    AlbumsComponent,
    AuthComponent,
    ArtistListComponent,
    ArtistCreateComponent,
    DialogArtistCreate,
    CustomSnackbarComponent,
    ArtistDetailsComponent,
    LoadingComponent,
    AlbumListComponent,
    AlbumCreateComponent,
    DialogAlbumCreate,
    AlbumDetailsComponent,
    ImageListComponent,
    ProfilePageComponent,
    ProfileComponent,
    DialogChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxErrorsModule,
    CarouselModule
  ],
  providers: [httpInterceptorProviders, paginatorPtBr],
  bootstrap: [AppComponent]
})
export class AppModule { }
