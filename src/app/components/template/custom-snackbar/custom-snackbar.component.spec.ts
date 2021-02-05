import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'

import { CustomSnackbarComponent } from './custom-snackbar.component'

describe('CustomSnackbarComponent', () => {
  let component: CustomSnackbarComponent
  let fixture: ComponentFixture<CustomSnackbarComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomSnackbarComponent],
      providers: [
        { provide: MatSnackBarRef, useValue: {} },
        { provide: MAT_SNACK_BAR_DATA, useValue: {} }
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSnackbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })
})
