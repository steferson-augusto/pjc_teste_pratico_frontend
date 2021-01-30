import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { AuthService } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup
  loading = false
  errors: Error[] = []
  constructor (
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit (): void {
    this.form = this.formBuilder.group({
      email: ['superuser@email.com', [Validators.required]],
      password: ['aIJUyry6D7wZleDm', [Validators.required]]
    })
  }

  // get error (): string {
  //   const value = this.errors.find(error => error.field === 'general')
  //   return value?.message ?? ''
  // }

  onSubmit () {
    this.loading = true
    this.authService.login(this.form.value).subscribe(
      result => {
        this.loading = false
        this.authService.saveToken(result)
        this.router.navigate([''])
      },
      ({ error }) => {
        this.loading = false
        this.errors = error
        console.error(error)
      }
    )
  }
}
