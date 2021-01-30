import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { MaterialModule } from './material.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/template/navbar/navbar.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { UsersComponent } from './pages/users/users.component'
import { ArtistsComponent } from './pages/artists/artists.component'
import { AlbumsComponent } from './pages/albums/albums.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    UsersComponent,
    ArtistsComponent,
    AlbumsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
