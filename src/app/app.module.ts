import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxErrorsModule } from '@ngspot/ngx-errors'
import { CarouselModule } from 'ngx-owl-carousel-o'

import { AppRoutingModule } from './app-routing.module'
import { TemplateModule } from './components/template/template.module'
import { AlbumModule } from './components/album/album.module'
import { httpInterceptorProviders } from './helpers/http-interceptors'
import { MaterialModule, paginatorPtBr } from './material/material.module'
import { AppComponent } from './app.component'
import { ArtistsComponent } from './pages/artists/artists.component'
import { AuthComponent } from './pages/auth/auth.component'
import { ArtistListComponent } from './components/artist/artist-list/artist-list.component'
import { ArtistCreateComponent, DialogArtistCreate } from './components/artist/artist-create/artist-create.component'
import { ArtistDetailsComponent } from './components/artist/artist-details/artist-details.component'
import { ProfileComponent as ProfilePageComponent } from './pages/profile/profile.component'
import { ProfileComponent } from './components/profile/profile.component'
import { DialogChangePasswordComponent } from './components/profile/dialog-change-password/dialog-change-password.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    AuthComponent,
    ArtistListComponent,
    ArtistCreateComponent,
    DialogArtistCreate,
    ArtistDetailsComponent,
    ProfilePageComponent,
    ProfileComponent,
    DialogChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxErrorsModule,
    CarouselModule,
    AlbumModule,
    TemplateModule
  ],
  providers: [httpInterceptorProviders, paginatorPtBr],
  bootstrap: [AppComponent]
})
export class AppModule { }
