import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { MatInput } from '@angular/material/input'

import { Album } from '../album.model'
import { AlbumService } from '../album.service'
import { Artist } from '../../artist/artist.model'
import { ArtistService } from '../../artist/artist.service'
import CustomValidator from 'src/app/helpers/custom-validator'
import { CustomSnackbarService } from '../../template/custom-snackbar/custom-snackbar.service'
import { formToError } from 'src/app/helpers/errors'

interface Image {
  path: string
}

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  form: FormGroup
  validations = this.albumService.validations
  errors = this.albumService.errors
  loading = true
  artists: Artist[] = []
  images: Image[] = []
  origin: Album = { name: '', year: null, artist_id: 0 }

  constructor (
    private albumService: AlbumService,
    private artistService: ArtistService,
    private snack: CustomSnackbarService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.artists = this.artistService.data
  }

  @ViewChild('inputName', { static: false }) inputName: MatInput

  async ngOnInit () {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      year: ['', [CustomValidator.integer(), CustomValidator.range(1800, 2021)]],
      artist_id: ['', [Validators.required, CustomValidator.integer()]]
    })
    this.form.disable()
    const id = this.route.snapshot.paramMap.get('id')
    this.albumService.getById(id).subscribe(
      album => {
        this.fillForm(album)
        this.images = album.images.map(image => ({ path: image.url }))
        this.loading = false
        this.origin = { ...album }
      }
    )
    this.artists = await this.artistService.all()
  }

  get editing (): boolean {
    return this.form.enabled
  }

  private fillForm (album: Album = this.origin): void {
    this.form.patchValue(album)
  }

  allowEdit () {
    this.form.enable()
    setTimeout(() => {
      this.inputName.focus()
    }, 0)
  }

  update () {
    this.loading = true
    const values: Album = { ...this.form.value, id: this.origin.id }
    this.albumService.update(values).subscribe(
      ({ album, message }) => {
        this.loading = false
        this.form.disable()
        this.origin = { ...this.origin, ...album }
        this.snack.open(message, '', 'done', ['success'])
      },
      ({ error }) => {
        this.loading = false
        this.errors.form = formToError(this.form, error)
        this.validations.form = Object.keys(this.errors.form)
        console.error(error)
      }
    )
  }

  cancelEdit () {
    this.form.disable()
    this.fillForm()
  }

  handleDelete () {
    const snackBarRef = this.snack.open('Deseja apagar este artista e seus álbuns?', 'Confirmar')
    snackBarRef.onAction().subscribe(() => {
      this.delete()
    })
  }

  private delete () {
    this.loading = true
    this.albumService.delete(this.origin.id).subscribe(
      ({ message }) => {
        this.loading = false
        const snackBarRef = this.snack.open(message, '', 'done', ['success'])
        snackBarRef.afterDismissed().subscribe(() => { this.router.navigate(['/albums']) })
      },
      ({ error }) => {
        this.loading = false
        this.errors.form = formToError(this.form, error)
        this.validations.form = Object.keys(this.errors.form)
        this.form.markAsTouched()
        console.error(error)
      }
    )
  }
}
