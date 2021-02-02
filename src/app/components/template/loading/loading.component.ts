import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() loading: boolean
  @Input() color: string

  get barColor (): string {
    return this.color ?? 'primary'
  }
}
