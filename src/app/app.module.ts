import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxErrorsModule } from '@ngspot/ngx-errors'

import { AppRoutingModule } from './app-routing.module'
import { httpInterceptorProviders } from './helpers/http-interceptors'
import { MaterialModule, paginatorPtBr } from './material/material.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/template/navbar/navbar.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { UsersComponent } from './pages/users/users.component'
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
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
    AlbumDetailsComponent
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
    NgxErrorsModule
  ],
  providers: [httpInterceptorProviders, paginatorPtBr],
  bootstrap: [AppComponent]
})
export class AppModule { }
