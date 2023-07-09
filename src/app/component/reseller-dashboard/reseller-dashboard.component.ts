import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/model/card';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/shared/data.service';

declare function dataTableInit():void;


@Component({
  selector: 'app-reseller-dashboard',
  templateUrl: './reseller-dashboard.component.html',
  styleUrls: ['./reseller-dashboard.component.css']
})
export class ResellerDashboardComponent implements OnInit {

  usersList: User[] = [];
  users:User[] = [];
  users1:User[] = [];
  usersPerPage: number = 5;
  public selectedPage= 1;
  public pageIndex = 0;
  searchText:any;
  cardsList: Card[]=[];
  cards1: Card[]=[];

  constructor( private data: DataService, private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.pageIndex = (this.selectedPage - 1)*this.usersPerPage;
  }

  logout(){
    this.data.logout();
    this.router.navigateByUrl("/login");
  }

  cards(user: any){
    this.router.navigate(['/cards'],{queryParams:user});
  }

  getAllUsers() {
    this.data.getAllusers().on('value', snapshotChanges => {
      this.usersList = [];
      snapshotChanges.forEach(child => {
       var cardData = child.val();
       cardData.key = child.key;
       this.usersList.push(cardData);
     });
      this.users = this.usersList.slice(this.pageIndex, this.usersPerPage);
      this.data.getAllads().on('value', snapshotChanges => {
        this.cardsList = [];
        snapshotChanges.forEach(child => {
         var cardData = child.val();
         cardData.key = child.key;
         this.cardsList.push(cardData);
       });
      this.users1 = this.users;
      
      
    });
      
      setTimeout(()=>{
        dataTableInit();
       },50);


    // this.data.getAllusers().then((value)=>{
    //   this.usersList = value as User[];
    //   // console.log(cards);
    // });
  });
}
  get pageNumbers(): number[]{
    return Array(Math.ceil(this.usersList.length / this.usersPerPage))
    .fill(0).map((x,i)=>i+1);
  }
  changePage(page:any){
    this.selectedPage = page;
    this.slicedProducts();
  }
  slicedProducts(){
    this.pageIndex = (this.selectedPage - 1)*this.usersPerPage;
    let endIndex = (this.selectedPage - 1)*this.usersPerPage + this.usersPerPage;
    this.users = this.usersList.slice(this.pageIndex, endIndex);
  }

  delUser(user: any){
    // console.log("user.email, user.password");
    this.data.deleteUser(user);
    this.reloadComponent();
  }
  upUser(user:any){
    this.router.navigate(['editUser'], {queryParams:user});
  }
  reloadComponent() {
    let currentUrl = this. router. url;
    this. router. routeReuseStrategy. shouldReuseRoute = () => false;
    this. router. onSameUrlNavigation = 'reload';
    this. router. navigate([currentUrl]);
    }
  
  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    
    if(event.target.id == 'cardEditButton'){
      var element = event.target;
      
      var index = element.getAttribute("data-index");
      this.upUser(this.users[index]);
    }
    if(event.target.id == 'cardDeleteButton'){
      var element = event.target;
      
      var index = element.getAttribute("data-index");
      this.delUser(this.users[index]);
    }
    if(event.target.id == 'cardsButton'){
      var element = event.target;
      
      var index = element.getAttribute("data-index");
      this.cards(this.users1[index]);
    }
  }
}
