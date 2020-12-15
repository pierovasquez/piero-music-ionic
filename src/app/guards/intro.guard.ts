import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(private storage: Storage, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    // tslint:disable-next-line: max-line-length
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.storage.get('isIntroShowed').then(response => {
        if (response) {
          resolve(true);
        } else {
          this.router.navigate(['/intro']);
          resolve(false);
        }
      });
    });
  }

}
