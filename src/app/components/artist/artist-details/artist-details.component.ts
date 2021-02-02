import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormControl, Validators } from '@angular/forms'
import { MatInput } from '@angular/material/input'

import { Artist } from '../artist.model'
import { ArtistService } from '../artist.service'
import { CustomSnackbarService } from '../../template/custom-snackbar/custom-snackbar.service'
import { formControlToError } from 'src/app/helpers/errors'

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {
  loading = false
  artist: Artist = { name: '' }
  private origin: Artist = { name: '' }
  errors = { ...this.artistService.errors.name, general: '' }
  validations = Object.keys(this.artistService.errors.name)
  name = new FormControl(
    { value: '', disabled: true },
    [Validators.required, Validators.minLength(3), Validators.maxLength(120)]
  )

  constructor (
    private artistService: ArtistService,
    private router: Router,
    private route: ActivatedRoute,
    private snack: CustomSnackbarService
  ) { }

  @ViewChild('inputName', { static: false }) inputName: MatInput

  ngOnInit (): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.artistService.getById(id).subscribe(
      artist => {
        this.artist = artist
        this.name.setValue(artist.name)
        this.loading = false
        this.origin = { ...artist }
      }
    )
  }

  get editing (): boolean {
    return this.name.enabled
  }

  allowEdit () {
    this.name.enable()
    setTimeout(() => {
      this.inputName.focus()
    }, 0)
  }

  update () {
    this.loading = true
    this.artist = { ...this.artist, name: this.name.value }
    this.artistService.update(this.artist).subscribe(
      ({ artist, message }) => {
        this.loading = false
        this.name.disable()
        this.name.setValue(artist.name)
        this.artist = { ...this.artist, ...artist }
        this.origin = { ...this.origin, ...artist }
        this.snack.open(message, '', 'done', ['success'])
      },
      ({ error }) => {
        this.loading = false
        this.errors.general = formControlToError('name', this.name, error)
        console.error(error)
      }
    )
  }

  cancelEdit () {
    this.name.disable()
    this.name.setErrors(null)
    this.artist = { ...this.origin }
    this.name.setValue(this.origin.name)
  }

  handleDelete () {
    const snackBarRef = this.snack.open('Deseja apagar este artista e seus álbuns?', 'Confirmar')
    snackBarRef.onAction().subscribe(() => {
      this.delete()
    })
  }

  delete () {
    this.loading = true
    this.artistService.delete(this.artist.id).subscribe(
      ({ message }) => {
        this.loading = false
        const snackBarRef = this.snack.open(message, '', 'done', ['success'])
        snackBarRef.afterDismissed().subscribe(() => { this.router.navigate(['/artists']) })
      },
      error => {
        this.loading = false
        this.errors.general = formControlToError('name', this.name, error)
        console.error(error)
      }
    )
  }
}
