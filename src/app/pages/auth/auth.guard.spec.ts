// import { TestBed } from '@angular/core/testing'

import { AuthGuard } from './auth.guard'

class MockRouter {
  navigate (path) {}
}

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AuthGuard
    let authService
    let router

    it('Deve retornar true se usuário estiver logado', () => {
      authService = { isUserLoggedIn: () => true }
      router = new MockRouter()
      authGuard = new AuthGuard(authService, router)

      expect(authGuard.canActivate()).toEqual(true)
    })

    it('Deve navegar para login caso usuário não esteja logado', () => {
      authService = { isUserLoggedIn: () => false }
      router = new MockRouter()
      authGuard = new AuthGuard(authService, router)
      spyOn(router, 'navigate')

      expect(authGuard.canActivate()).toEqual(false)
      expect(router.navigate).toHaveBeenCalledWith(['login'])
    })
  })

  describe('canLoad', () => {
    let authGuard: AuthGuard
    let authService
    let router

    it('Deve retornar true se usuário estiver logado', () => {
      authService = { isUserLoggedIn: () => true }
      router = new MockRouter()
      authGuard = new AuthGuard(authService, router)

      expect(authGuard.canLoad()).toEqual(true)
    })

    it('Deve navegar para login caso usuário não esteja logado', () => {
      authService = { isUserLoggedIn: () => false }
      router = new MockRouter()
      authGuard = new AuthGuard(authService, router)
      spyOn(router, 'navigate')

      expect(authGuard.canLoad()).toEqual(false)
      expect(router.navigate).toHaveBeenCalledWith(['login'])
    })
  })
})
