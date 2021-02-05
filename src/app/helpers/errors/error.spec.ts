import { FormControl, FormGroup } from '@angular/forms'
import { formControlToError, formToError } from '.'

describe('Função "formToError"', () => {
  it('Verifica e adiciona erros a formulário', () => {
    const form = new FormGroup({
      name: new FormControl()
    })
    const error = [
      { field: 'general', message: 'Falha de teste' },
      { field: 'name', message: 'Nome inválido', validation: 'test' }
    ]
    const result = formToError(form, error)

    expect(result).toEqual({ general: 'Falha de teste' })
    expect(form.get('name').hasError('test')).toBeTruthy()
    expect(form.hasError('general')).toBeTruthy()
  })
})

describe('Função "formControlToError"', () => {
  it('Verifica se existe general error', () => {
    const control = new FormControl()
    const error = [{ field: 'general', message: 'Falha de teste' }]
    const result = formControlToError('teste', control, error)

    expect(result).toEqual('Falha de teste')
    expect(control.hasError('general')).toBeTruthy()
  })

  it('Verifica se existe erro específico', () => {
    const control = new FormControl()
    const error = [{ field: 'name', message: 'Falha de teste', validation: 'teste' }]
    const result = formControlToError('name', control, error)

    expect(result).toEqual('')
    expect(control.hasError('teste')).toBeTruthy()
  })
})
