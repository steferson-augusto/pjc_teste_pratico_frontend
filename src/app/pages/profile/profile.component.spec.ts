import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfileComponent } from './profile.component'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })

  it('Deve renderizar <app-profile>', () => {
    const fixture = TestBed.createComponent(ProfileComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.outerHTML).toContain('app-profile')
  })
})
