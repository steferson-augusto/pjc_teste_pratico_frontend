import { Component } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { formControlToError } from 'src/app/helpers/errors'
import { CustomSnackbarService } from '../../template/custom-snackbar/custom-snackbar.service'

import { Artist } from '../artist.model'
import { ArtistService } from '../artist.service'

@Component({
  selector: 'app-artist-create',
  templateUrl: './artist-create.component.html',
  styleUrls: ['./artist-create.component.scss']
})
export class ArtistCreateComponent {
  constructor (public dialog: MatDialog) { }

  artist: Artist = { name: '' }

  openDialog (): void {
    this.dialog.open(DialogArtistCreate, {
      width: '250px',
      panelClass: 'dialog-container'
    })
  }
}

@Component({
  selector: 'artist-create-dialog',
  templateUrl: 'artist-create-dialog.html',
  styleUrls: ['./artist-create.component.scss']
})
export class DialogArtistCreate {
  constructor (
    private artistService: ArtistService,
    public dialogRef: MatDialogRef<DialogArtistCreate>,
    private snack: CustomSnackbarService
  ) {}

  loading = false
  name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(120)])
  errors = { ...this.artistService.errors.name, general: '' }
  readonly validations = Object.keys(this.artistService.errors.name)

  get artist () {
    return { name: this.name.value }
  }

  create (): void {
    this.loading = true
    this.artistService.create(this.artist).subscribe(
      () => {
        this.loading = false
        this.snack.open('Artista criado com sucesso')
        this.name.setValue('')
        this.artistService.emit()
        this.dialogRef.close()
      },
      ({ error }) => {
        this.errors.general = formControlToError('name', this.name, error)
        this.loading = false
        console.error(error)
      }
    )
  }

  onNoClick (): void {
    this.dialogRef.close()
  }
}
