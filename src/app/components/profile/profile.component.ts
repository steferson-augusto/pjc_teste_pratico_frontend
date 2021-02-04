import { Component, OnInit } from '@angular/core'
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'

import { formToError } from 'src/app/helpers/errors'
import { CustomSnackbarService } from '../template/custom-snackbar/custom-snackbar.service'
import { DialogChangePasswordComponent } from './dialog-change-password/dialog-change-password.component'
import { Profile } from './profile.model'

import { ProfileService } from './profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  form: FormGroup
  profile: Profile
  validations = this.profileService.validations
  errors = this.profileService.errors
  loading = true
  constructor (
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private snack: CustomSnackbarService,
    public dialog: MatDialog
  ) { }

  ngOnInit (): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(120)]],
      email: [
        { value: 'teste', disabled: true },
        [Validators.required, Validators.email, Validators.minLength(7), Validators.maxLength(50)]
      ]
    })

    this.profileService.getProfile().subscribe(
      data => {
        this.profile = data
        this.loading = false
        this.form.patchValue(data)
      },
      () => {
        this.loading = false
        this.snack.open('Falha ao recuperar dados do perfil', '', 'error', ['warning'])
      }
    )
  }

  get user () {
    return this.form.getRawValue()
  }

  update (): void {
    this.loading = true
    const data = { ...this.profile, ...this.user }
    this.profileService.update(data).subscribe(
      ({ user }) => {
        this.profile = user
        this.form.patchValue(user)
        this.loading = false
        this.form.markAsPristine()
        this.snack.open('Perfil atualizado com sucesso', '', 'done', ['success'])
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

  changePassword (): void {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '250px',
      panelClass: 'dialog-container'
    })

    dialogRef.afterClosed().subscribe(message => {
      if (message) {
        this.snack.open(message, '', 'done', ['success'])
      }
    })
  }
}
