import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from 'src/app/model/card';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/shared/data.service';
import {AngularFireStorage} from '@angular/fire/compat/storage';

@Component({
  selector: 'app-live-houses',
  templateUrl: './live-houses.component.html',
  styleUrls: ['./live-houses.component.css']
})
export class LiveHousesComponent implements OnInit {

  constructor(private data:DataService,private router:Router, private route:ActivatedRoute,private storage: AngularFireStorage ) { }

  ngOnInit(): void {
    this.loadData();
    this.getAds();
    this.getRentees();
    this.getOwned();
  }

  isLoading: boolean = true;
  selectedOption1: Card |undefined;
  selectedOption2: User|undefined;
  choose:string = 'Choose Ad';
  choose1:string = 'Choose Rentee';

  renteesList: User[] = [];
  renteesList1: User[] = [];
  adsList: Card[] = [];

  tableData: any[] = [
  ];


  openFileExplorer(id:string) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => this.handleFileSelection(event.target.files, id);
    input.click();
  }

  async handleFileSelection(files: FileList, id:string) {
    var file = files[0];
    if(file){
      const path = `rerm/${file.name}`
      const uploadTask = await this.storage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      this.data.uploadAgreement(url, this.tableData);
    }
  }
 

  getAds(){
    this.data.getAllads().on('value', snapshotChanges => {
      this.adsList = [];
      snapshotChanges.forEach(child => {
       var cardData = child.val();
       cardData.id = child.key;
       cardData.key = child.key;
       this.adsList.push(cardData);
     })})
}

getOwned(){
  this.data.getOwnedHouses().subscribe((data: any[]) => {
    this.tableData = data.map((item: any) => {
      const user = this.getUserByEmail(item.uid);
      const ad = this.getAdByTitle(item.ad);

      return {
        uid: user || 'N/A',
        adid: ad || 'N/A',
        payments: item.payments
      };
    });
  });
}


getUserByEmail(email: string) {
  return this.renteesList1.find((user: User) => user.id === email);
}

getAdByTitle(title: string) {
  return this.adsList.find((ad: Card) => ad.id.endsWith(title));
}


getRentees(){
  this.data.getAllusers().on('value', snapshotChanges => {
    this.renteesList = [];
    snapshotChanges.forEach(child => {
     var cardData = child.val();
     cardData.key = child.key;
     this.renteesList.push(cardData);
   })})
   this.renteesList1 = this.renteesList;
   this.renteesList = this.renteesList.filter(e=>e.owned==false);
}

loadData() {
  // Simulate asynchronous data loading
  this.getRentees();
  setTimeout(() => {
    // Data loading is complete
    this.isLoading = false;
  }, 2000);
}
  submit() {
    if (this.selectedOption1 && this.selectedOption2) {
      const confirmation = window.confirm('Are you sure about it?');
      if (confirmation) {
        // Perform the desired action when confirmed
        this.data.liveHouse(this.selectedOption1, this.selectedOption2);
      }
    } else {
      alert('Please select an Ad and a Rentee.');
    }
    
  }

}

