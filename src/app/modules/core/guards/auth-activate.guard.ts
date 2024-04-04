import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authActivateGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isLogged();
  return isLoggedIn ? inject(Router).createUrlTree(['']) : !isLoggedIn;
};
