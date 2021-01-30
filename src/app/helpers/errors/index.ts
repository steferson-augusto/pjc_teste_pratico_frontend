import { FormControl, FormGroup } from '@angular/forms'

import { Error } from './error.model'

interface ErrorValidation {
  [key: string]: string
}

export const formToError = (form: FormGroup, errors: Error[]): ErrorValidation => {
  const generalErrors = {}
  errors.forEach(error => {
    const formControl = form.get(error.field)
    if (formControl) {
      formControl.setErrors({ [error.validation]: true })
    } else {
      generalErrors[error.field] = error.message
      form.setErrors({ [error.field]: true })
    }
  })

  return generalErrors
}

export const formControlToError = (label: string, control: FormControl, errors: Error[]): string => {
  let value = ''
  errors.some(error => {
    if (label === error.field) {
      control.setErrors({ [error.validation]: true })
      return true
    } else {
      control.setErrors({ general: true })
      value = error.message
      return false
    }
  })

  return value
}
