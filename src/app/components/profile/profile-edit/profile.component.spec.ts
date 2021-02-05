import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { MaterialModule } from 'src/app/material/material.module'
import { ProfileService } from '../profile.service'

import { ProfileEditComponent } from './profile.component'

describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent
  let fixture: ComponentFixture<ProfileEditComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [ProfileService],
      declarations: [ProfileEditComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })
})
