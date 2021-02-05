import { Overlay } from '@angular/cdk/overlay'
import { TestBed } from '@angular/core/testing'
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { CustomSnackbarService } from './custom-snackbar.service'

describe('CustomSnackbarService', () => {
  let service: CustomSnackbarService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [CustomSnackbarService, MatSnackBar, Overlay]
    })
    service = TestBed.inject(CustomSnackbarService)
  })

  it('Deve ser criado', () => {
    expect(service).toBeTruthy()
  })

  it('Deve abrir snack-bar', () => {
    const ref = service.open('Texto', '', 'done')
    expect(ref).toBeInstanceOf(MatSnackBarRef)
  })
})
