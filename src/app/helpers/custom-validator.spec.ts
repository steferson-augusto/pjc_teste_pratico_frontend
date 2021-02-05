import { FormControl } from '@angular/forms'
import CustomValidator from './custom-validator'

describe('Validações customizadas - integer', () => {
  const integerValidator = CustomValidator.integer()
  const control = new FormControl('input')

  it('Valida formulário caso valor seja inteiro', () => {
    control.setValue('2000')
    expect(integerValidator(control)).toBeNull()
  })

  it('Retorna erro caso valor não seja inteiro', () => {
    control.setValue('abc')
    expect(integerValidator(control)).toEqual({ integer: true })

    control.setValue('200.15')
    expect(integerValidator(control)).toEqual({ integer: true })

    control.setValue('200A')
    expect(integerValidator(control)).toEqual({ integer: true })
  })
})

describe('Validações customizadas - range', () => {
  const rangeValidator = CustomValidator.range(1500, 2020)
  const control = new FormControl('input')

  it('Valida formulário caso valor esteja contido no intervalo', () => {
    control.setValue('2000')
    expect(rangeValidator(control)).toBeNull()
  })

  it('Retorna erro caso valor não esteja contido no intervalo', () => {
    control.setValue('1000')
    expect(rangeValidator(control)).toEqual({ range: true })

    control.setValue('1499')
    expect(rangeValidator(control)).toEqual({ range: true })

    control.setValue('2021')
    expect(rangeValidator(control)).toEqual({ range: true })
  })
})
