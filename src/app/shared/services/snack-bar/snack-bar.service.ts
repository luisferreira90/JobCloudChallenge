import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private readonly _snackBar: MatSnackBar) {}

  displayMessage(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 5000,
    });
  }
}
