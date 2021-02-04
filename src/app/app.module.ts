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
import { AuthComponent } from './pages/auth/auth.component'
import { ProfileComponent as ProfilePageComponent } from './pages/profile/profile.component'
import { ProfileComponent } from './components/profile/profile.component'
import { DialogChangePasswordComponent } from './components/profile/dialog-change-password/dialog-change-password.component'
import { RouterModule } from '@angular/router'
import { ArtistModule } from './components/artist/artist.module'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
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
    ArtistModule,
    TemplateModule
  ],
  providers: [httpInterceptorProviders, paginatorPtBr],
  bootstrap: [AppComponent]
})
export class AppModule { }
