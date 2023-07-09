import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private data : DataService) { }

  ngOnInit(): void {
  }

  login() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    this.data.signin(this.email,this.password);
    
    // this.email = '';
    // this.password = '';

  }

  // signInWithGoogle() {
  //   this.auth.googleSignIn();
  // }
 
}
