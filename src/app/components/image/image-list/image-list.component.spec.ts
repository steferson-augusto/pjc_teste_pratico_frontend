import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'
import { MaterialModule } from 'src/app/material/material.module'
import { ImageService } from '../image.service'

import { ImageListComponent } from './image-list.component'

describe('ImageListComponent', () => {
  let component: ImageListComponent
  let fixture: ComponentFixture<ImageListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      providers: [
        ImageService,
        { provide: MatSnackBarRef, useValue: {} },
        { provide: MAT_SNACK_BAR_DATA, useValue: {} }
      ],
      declarations: [ImageListComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })
})
