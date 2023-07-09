import { Component, HostListener, OnInit } from '@angular/core';
import { Card } from 'src/app/model/card';
import { DataService } from 'src/app/shared/data.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

declare function dataTableInit():void;

@Component({
  selector: 'app-dashboard',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {

  cardsList: Card[]= [];
  cards:Card[] = [];
  cardsPerPage: number = 5;
  public selectedPage= 1;
  public pageIndex = 0;
  searchText: any;

  constructor(private db:AngularFireDatabase, private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCards();
    this.pageIndex = (this.selectedPage - 1)*this.cardsPerPage;
  }
  
  getAllCards() {
    this.data.getAllads().on('value', snapshotChanges => {
      this.cardsList = [];
      snapshotChanges.forEach(child => {
       console.log(child.key);
       console.log(child.val());
       var cardData = child.val();
       cardData.key = child.key;
       this.cardsList.push(cardData);
     });

     this.cards = this.cardsList.slice(this.pageIndex, this.cardsPerPage);

    
     setTimeout(()=>{
      dataTableInit();
      
     },50);
   });
  }
  get pageNumbers(): number[]{
    return Array(Math.ceil(this.cardsList.length / this.cardsPerPage))
    .fill(0).map((x,i)=>i+1);
  }
  changePage(page:any){
    this.selectedPage = page;
    this.slicedProducts();
  }
  slicedProducts(){
    this.pageIndex = (this.selectedPage - 1)*this.cardsPerPage;
    let endIndex = (this.selectedPage - 1)*this.cardsPerPage + this.cardsPerPage;
    this.cards = [];
    this.cards = this.cardsList.slice(this.pageIndex, endIndex);
  }
  delCard(card:any) {
    // console.log("deleted!");

    var key = card["key"];
    this.data.deleteCard(key);
  }
  upCard(card:any){
    this.router.navigate(['editCard'],{queryParams:card});
  }

  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    if(event.target.id == 'cardEditButton'){
      var element = event.target;
      
      var index = element.getAttribute("data-index");
      this.upCard(this.cards[index]);
    }
    if(event.target.id == 'cardDeleteButton'){
      var element = event.target;
      
      var index = element.getAttribute("data-index");
      this.delCard(this.cards[index]);
    }
  }

  


}

