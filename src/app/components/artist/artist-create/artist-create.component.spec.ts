import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { MaterialModule } from 'src/app/material/material.module'
import { ArtistService } from '../artist.service'

import { ArtistCreateComponent } from './artist-create.component'

describe('ArtistCreateComponent', () => {
  let component: ArtistCreateComponent
  let fixture: ComponentFixture<ArtistCreateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      providers: [ArtistService],
      declarations: [ArtistCreateComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCreateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })
})
