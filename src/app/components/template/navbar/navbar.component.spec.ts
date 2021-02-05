import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { NavbarComponent } from './navbar.component'

describe('NavbarComponent', () => {
  let component: NavbarComponent
  let fixture: ComponentFixture<NavbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        NavbarComponent
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })

  it('Deve ter elementos base', () => {
    const fixture = TestBed.createComponent(NavbarComponent)
    const compiled = fixture.nativeElement
    expect(compiled.outerHTML).toContain('class="body"', 'mat-toolbar')
    expect(compiled.outerHTML).toContain('class="btn-menu"', 'id="check"')
    expect(compiled.outerHTML).toContain('class="container"', 'class="sidebar"')
    expect(compiled.outerHTML).toContain('class="content"')
  })
})
