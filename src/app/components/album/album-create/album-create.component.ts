import { Component, Inject, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import { Album } from '../album.model'
import { AlbumService } from '../album.service'
import CustomValidator from 'src/app/helpers/custom-validator'
import { Artist } from '../../artist/artist.model'
import { ArtistService } from '../../artist/artist.service'
import { Router } from '@angular/router'
import { CustomSnackbarService } from '../../template/custom-snackbar/custom-snackbar.service'
import { formToError } from 'src/app/helpers/errors'

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.scss']
})
export class AlbumCreateComponent implements OnInit {
  artists: Artist[] = []
  constructor (
    public dialog: MatDialog,
    private artistService: ArtistService
  ) {
    this.artists = this.artistService.data
  }

  album: Album = { name: '' }

  async ngOnInit () {
    this.artists = await this.artistService.all()
  }

  openDialog (): void {
    this.dialog.open(DialogAlbumCreate, {
      width: '250px',
      panelClass: 'dialog-container',
      data: this.artists
    })
  }
}

@Component({
  selector: 'album-create-dialog',
  templateUrl: 'album-create-dialog.html',
  styleUrls: ['./album-create.component.scss']
})
export class DialogAlbumCreate implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: Artist[],
    private albumService: AlbumService,
    private snack: CustomSnackbarService,
    public dialogRef: MatDialogRef<DialogAlbumCreate>,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  loading = false
  form: FormGroup
  validations = this.albumService.validations
  errors = this.albumService.errors

  ngOnInit (): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      year: ['', [CustomValidator.integer(), CustomValidator.range(1800, 2021)]],
      artist_id: ['', [Validators.required, CustomValidator.integer()]]
    })
  }

  get album () {
    return this.form.value
  }

  create (): void {
    this.loading = true
    this.albumService.create(this.album).subscribe(
      ({ album }) => {
        this.loading = false
        this.snack.open('Álbum criado com sucesso')
        this.dialogRef.close()
        this.router.navigate([`/albums/${album.id}`])
      },
      ({ error }) => {
        this.loading = false
        this.errors.form = formToError(this.form, error)
        this.validations.form = Object.keys(this.errors.form)
        console.error(error)
      }
    )
  }

  onNoClick (): void {
    this.dialogRef.close()
  }
}
