import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxErrorsModule } from '@ngspot/ngx-errors'
import { CarouselModule } from 'ngx-owl-carousel-o'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { TemplateModule } from './components/template/template.module'
import { AlbumModule } from './components/album/album.module'
import { httpInterceptorProviders } from './helpers/http-interceptors'
import { MaterialModule, paginatorPtBr } from './material/material.module'
import { AuthComponent } from './pages/auth/auth.component'
import { ArtistModule } from './components/artist/artist.module'
import { ProfileModule } from './components/profile/profile.module'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
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
    ProfileModule,
    TemplateModule
  ],
  providers: [httpInterceptorProviders, paginatorPtBr],
  bootstrap: [AppComponent]
})
export class AppModule { }
