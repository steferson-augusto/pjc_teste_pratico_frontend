import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxErrorsModule } from '@ngspot/ngx-errors'

import { AppRoutingModule } from './app-routing.module'
import { httpInterceptorProviders } from './helpers/http-interceptors'
import { MaterialModule } from './material.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/template/navbar/navbar.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { UsersComponent } from './pages/users/users.component'
import { ArtistsComponent } from './pages/artists/artists.component'
import { AlbumsComponent } from './pages/albums/albums.component'
import { AuthComponent } from './pages/auth/auth.component'
import { ArtistListComponent } from './components/artist/artist-list/artist-list.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    ArtistsComponent,
    AlbumsComponent,
    AuthComponent,
    ArtistListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxErrorsModule,
    MaterialModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
