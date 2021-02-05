import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AlbumsComponent } from './albums.component'

describe('AlbumsComponent', () => {
  let component: AlbumsComponent
  let fixture: ComponentFixture<AlbumsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlbumsComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })

  it('Deve renderizar <app-album-list> e <app-album-create>', () => {
    const fixture = TestBed.createComponent(AlbumsComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.outerHTML).toContain('app-album-list', 'app-album-create')
  })
})
