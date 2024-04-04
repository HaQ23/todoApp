import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../../services/forms.service';
import { LoginUser, User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  userData: LoginUser = {
    userName: '',
    password: '',
  };
  loginForm = new FormGroup(
    {
      userName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    },
    { updateOn: 'submit' }
  );
  get controls() {
    return this.loginForm.controls;
  }
  constructor(
    private formService: FormsService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.userData).subscribe({
        next: (response) => {
          if (response.length === 0) {
            this._snackBar.open('Podałeś złe dane do logowania', 'OK', {
              duration: 3000,
            });
            this.loginForm.reset();
          }
        },
      });
    }
  }
  getErrorMessage(formControl: FormControl) {
    return this.formService.getErrorMessage(formControl);
  }
}
