import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { MaterialModule } from 'src/app/material/material.module'
import { ArtistService } from '../artist.service'
import { ArtistListComponent } from './artist-list.component'

describe('ArtistListComponent', () => {
  let component: ArtistListComponent
  let fixture: ComponentFixture<ArtistListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, MaterialModule],
      providers: [ArtistService],
      declarations: [ArtistListComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })

  it('Deve ter elementos base', () => {
    const fixture = TestBed.createComponent(ArtistListComponent)
    const compiled = fixture.nativeElement
    expect(compiled.outerHTML).toContain('class="search"', 'class="table-container"')
  })
})
