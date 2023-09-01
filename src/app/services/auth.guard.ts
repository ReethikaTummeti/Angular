import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../user/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const status = inject(AuthService).isLoggedIn();
  const router = inject(Router);
  if (!status) {
    router.navigateByUrl('/user/login');
  }
  return status;
};
