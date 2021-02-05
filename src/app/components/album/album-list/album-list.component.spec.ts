import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { MaterialModule } from 'src/app/material/material.module'
import { AlbumService } from '../album.service'
import { AlbumListComponent } from './album-list.component'

describe('AlbumListComponent', () => {
  let component: AlbumListComponent
  let fixture: ComponentFixture<AlbumListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, MaterialModule],
      providers: [AlbumService],
      declarations: [AlbumListComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('Deve ser criado', () => {
    expect(component).toBeTruthy()
  })

  it('Deve ter elementos base', () => {
    const fixture = TestBed.createComponent(AlbumListComponent)
    const compiled = fixture.nativeElement
    expect(compiled.outerHTML).toContain('class="search"', 'class="table-container"')
  })
})
