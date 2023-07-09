import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'AngularFirebaseconnect';

  loggedIn:any;
  constructor(private data:DataService, private router:Router){
    this.loggedIn = this.data.logg;
  }
  ngAfterContentChecked(): void {
    this.loggedIn = this.data.logg;
  }


  ngOnInit(): void {
    this.loggedIn = this.data.logg;
  }

  logout(){
    this.data.logout();
    this.router.navigateByUrl("/login");
  }
}
