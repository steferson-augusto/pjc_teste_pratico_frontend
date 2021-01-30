import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

import { CustomSnackbarComponent } from './custom-snackbar.component'

@Injectable({
  providedIn: 'root'
})
export class CustomSnackbarService {
  constructor (private snackBar: MatSnackBar) { }

  open (text: string, action = '', icon = '', classes: undefined | string[] = undefined) {
    return this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { text, action, icon },
      panelClass: classes,
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }
}
