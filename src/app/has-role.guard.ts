import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  flag: boolean;

  constructor(private auth:DataService, private router:Router){
    this.flag = this.auth.isLoggedIn;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.flag){
        window.alert('Please login to proceed');
        this.router.navigateByUrl('login');
      }
    return this.flag;
  }
  
}
