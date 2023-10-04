import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: ApiService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInUser()) {
      return true; // Allow access to the route if the user is logged in
    } else {
      // Redirect to the login page if the user is not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}