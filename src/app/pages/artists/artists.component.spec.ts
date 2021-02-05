import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ArtistsComponent } from './artists.component'

describe('ArtistsComponent', () => {
  let component: ArtistsComponent
  let fixture: ComponentFixture<ArtistsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistsComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })

  it('Deve renderizar <app-artist-list> e <app-artist-create>', () => {
    const fixture = TestBed.createComponent(ArtistsComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.outerHTML).toContain('app-artist-list', 'app-artist-create')
  })
})
