import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

const CustomValidator = {
  integer: (): ValidatorFn | null => {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: ValidationErrors = { integer: true }

      if (control.value && `${control.value}` !== `${parseInt(control.value, 10)}`) {
        control.setErrors(error)
        return error
      }
      control.setErrors(null)
      return null
    }
  },
  range: (min: number, max: number): ValidatorFn | null => {
    return (control: AbstractControl): ValidationErrors | null => {
      const error: ValidationErrors = { range: true }
      const value = Number(control.value)
      if (control.value && (value < min || value > max)) {
        control.setErrors(error)
        return error
      }

      control.setErrors(null)
      return null
    }
  }
}

export default CustomValidator
