import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoadingComponent } from './loading.component'

describe('LoadingComponent', () => {
  let component: LoadingComponent
  let fixture: ComponentFixture<LoadingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })

  it('Deve exibir <mat-progress-bar> caso loading for true', () => {
    const fixture = TestBed.createComponent(LoadingComponent)
    const instance = fixture.componentInstance
    instance.loading = true
    fixture.detectChanges()
    let compiled = fixture.nativeElement
    expect(compiled.outerHTML).toContain('mat-progress-bar')

    instance.loading = false
    fixture.detectChanges()
    compiled = fixture.nativeElement
    expect(compiled.outerHTML).not.toContain('mat-progress-bar')
  })
})
