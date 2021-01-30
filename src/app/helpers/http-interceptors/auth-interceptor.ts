import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, throwError } from 'rxjs'
import { catchError, filter, switchMap, take } from 'rxjs/operators'

import { AuthService } from 'src/app/pages/auth/auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor (
  private authService: AuthService
  ) { }

  intercept (request: HttpRequest<any>, next: HttpHandler) {
    // console.clear()
    const token = this.authService.getAuthorizationToken()
    if (token) {
      request = this.addToken(request, token)
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next)
      } else {
        return throwError(error)
      }
    }))
  }

  private addToken (request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  private handle401Error (request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true
      this.refreshTokenSubject.next(null)

      return this.authService.refreshToken().pipe(
        switchMap((data: any) => {
          this.authService.saveToken(data)
          this.isRefreshing = false
          this.refreshTokenSubject.next(data.token)
          return next.handle(this.addToken(request, data.token))
        }))
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt.token))
        }))
    }
  }
}
