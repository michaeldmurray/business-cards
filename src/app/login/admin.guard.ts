import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoginService} from './login.service';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: LoginService,
    private router: Router,
    private db: AngularFireDatabase) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    const isAdmin: Observable<boolean> = this.db.object(`admins/${this.authService.userUid}`).valueChanges().pipe(
      map((x: boolean) => x),
      tap((access) => {
        if (!access) {
          console.log('access denied. must be an administrator.');
          this.router.navigate(['dashboard']);
        }
      })
    );
    return isAdmin;
  }
}
