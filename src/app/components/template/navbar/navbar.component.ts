import { Component } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title: string = ''
  constructor (private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.title = this.route.snapshot.firstChild.data.title ?? ''
      }
    })
  }
}
