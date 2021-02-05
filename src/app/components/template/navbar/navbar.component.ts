import { Component } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { AuthService } from 'src/app/pages/auth/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title: string = ''
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const data = this.route?.snapshot?.firstChild?.firstChild?.firstChild?.data
        this.title = data?.title ?? '404'
      }
    })
  }

  logout () {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
