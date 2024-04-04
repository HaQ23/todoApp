import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { FormsService } from '../../../services/forms.service';
import { PostUser } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  hideConfirm = true;
  registerForm = new FormGroup(
    {
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.minLength(5),
        ],
        nonNullable: true,
      }),
      userName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          this.passwordsMatchValidator,
        ],
        nonNullable: true,
      }),
    },
    { updateOn: 'blur' }
  );
  get controls() {
    return this.registerForm.controls;
  }
  constructor(
    private formService: FormsService,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  getErrorMessage(formControl: FormControl) {
    return this.formService.getErrorMessage(formControl);
  }
  onRegister() {
    if (this.registerForm.valid) {
      const userData: PostUser = this.registerForm.getRawValue();
      this.authService.checkUserExists(userData.userName).subscribe({
        next: (el) => {
          if (!el) {
            this.authService.register(userData).subscribe({
              next: () => {
                this.router.navigate(['/login']);
              },
              error: () => {
                console.log('wystapil blad');
              },
            });
          } else {
            this._snackBar.open('Taki użytkownik już istnieje', 'OK', {
              duration: 3000,
            });
            this.registerForm.reset();
          }
        },
      });
    }
  }

  passwordsMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordsNotMatch: true };
    }

    return null;
  }
}
