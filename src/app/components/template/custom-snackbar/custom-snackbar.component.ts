import { Component, Inject } from '@angular/core'
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'

import { CustomSnackbar } from './custom-snackbar.model'

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent {
  constructor (
    public snackBarRef: MatSnackBarRef<any>,
    @Inject(MAT_SNACK_BAR_DATA) public data: CustomSnackbar
  ) { }
}
