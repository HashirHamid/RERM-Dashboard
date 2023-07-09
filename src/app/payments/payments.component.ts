import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ImageModalComponent } from 'src/app/imagemodal/imagemodal.component';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  
  list : any;
  
  constructor(private dialog: MatDialog, private route:ActivatedRoute, private data: DataService){}
  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('payments');
    this.data.getOwnedHouse().on('value', snapshotChanges => {
      this.list = [];
      snapshotChanges.forEach(child => {
       var cardData = child.val();
       cardData.key = child.key;
       this.list.push(cardData);
     })})
    console.log("id: "+id);
    console.log("list: "+this.list);
    this.list = this.list.find((item:any)=>item.uid.endsWith(id));
    console.log(this.list);
    this.ownedHouses = this.list['payments'];
    console.log(this.ownedHouses);
  }

  payments: any;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  ownedHouses: { [key: string]: any }|any = {

    //   'January': {
    //     'status': '',
    //     'image': 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
    //   },
    //   'February': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'March': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'April': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'May': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'June': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'July': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'August': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'September': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'October': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'November': {
    //     'status': '',
    //     'image': ''
    //   },
    //   'December': {
    //     'status': '',
    //     'image': ''
      
    // }
  };

  enlargeImage(month: string) {
    const imageUrl = this.ownedHouses[month]['image'];

    const dialogRef = this.dialog.open(ImageModalComponent, {
      data: { imageUrl },
    });
  }

  handleCheck(month: string) {
    this.list['payments'][month]['status'] = 'paid';
    this.data.check(this.list);
  }

  handleCross(month:string) {
  }

  checkPaid(month: string){
    if(this.ownedHouses[month]['status'] == "paid"){
      return true;
    }
    else{
      return false;
    }
  }

  getImageUrl(month: string): string {
    return this.ownedHouses[month]['image'];
  }
}
