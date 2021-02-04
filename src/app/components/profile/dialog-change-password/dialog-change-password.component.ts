import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { formToError } from 'src/app/helpers/errors'
import { ProfileService } from '../profile.service'
import { DialogPassword } from './dialog-password.model'

type Validations = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof DialogPassword | 'form']?: string[]
}

const baseEssor = {
  required: 'Campo obrigatório',
  minlength: 'Mínimo de caracteres não atingido',
  min: 'Mínimo de caracteres não atingido',
  maxlength: 'Máximo de caracteres excedido',
  max: 'Máximo de caracteres excedido'
}

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {
  constructor (
    public dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) { }

  loading = false
  form: FormGroup
  hide = { new: true, old: true }
  errors = {
    password: { ...baseEssor, confirmed: 'Confirme a senha corretamente' },
    password_confirmation: baseEssor,
    old_password: { ...baseEssor, confirmed: 'Sua senha atual não confere' },
    form: { }
  }

  validations = Object.keys(this.errors).reduce((result, field) => {
    result[field] = Object.keys(this.errors[field])
    return result
  }, {}) as Validations

  ngOnInit (): void {
    this.form = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    })
  }

  onNoClick (): void {
    this.dialogRef.close()
  }

  changePassword () {
    this.loading = true
    this.profileService.updatePassword(this.form.value).subscribe(
      ({ message }) => {
        this.loading = false
        this.dialogRef.close(message)
      },
      ({ error }) => {
        this.loading = false
        console.error(error)
        this.errors.form = formToError(this.form, error)
        this.validations.form = Object.keys(this.errors.form)
        this.form.markAsTouched()
      }
    )
  }
}
