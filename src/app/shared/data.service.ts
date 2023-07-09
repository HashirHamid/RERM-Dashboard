import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../model/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Card } from '../model/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isLoggedIn:boolean;
  currentFirebaseUser:any = null;

  constructor(private db: AngularFireDatabase, private fAuth: AngularFireAuth, private router:Router) { 
    this.isLoggedIn = this.adminUID?true:false;
  }

  get adminUID():any{
    return localStorage.getItem("adminUID");
  }
  get logg():any{
    return localStorage.getItem("loggedIn");
  }

  async signin(email: string , password: string){
    await this.fAuth.signInWithEmailAndPassword(email, password).then(
      res=>{
        this.fAuth.currentUser.then(response => {
          this.currentFirebaseUser = response;
          
          

          console.log(this.currentFirebaseUser);
          this.db.database.ref("adminUID").once('value', snapshotChanges => {
            

            if(this.currentFirebaseUser.uid == snapshotChanges.val()){
              localStorage.setItem('adminUID', JSON.stringify(response?.getIdToken));
              localStorage.setItem('loggedIn', JSON.stringify(response?.getIdToken));
              this.router.navigate(['/cardsList']);

            }
            else{
              alert("Error");
              return
            }
          });
        });
        this.isLoggedIn = true;
        
        
      }
    ).catch(e=>{
      alert(e);
    });
  }

  async signup(user: User){
    await this.fAuth.createUserWithEmailAndPassword(user.email, user.password).then(
      res=>{
        this.isLoggedIn = true;
        // this.addUser(user, res.user?.uid);
      }
    );
    
  }

  logout(){
    localStorage.clear();
  }

  async editUser(user:any, oldUser:any){
    await this.fAuth.signInWithEmailAndPassword(oldUser.email, oldUser.password).then(
      res=>{
        this.fAuth.currentUser.then(response => {
          response?.updateEmail(user.email);
          response?.updatePassword(user.password);
        });
      }
    ).then(()=>{
      this.db.object('users/'+user.id).update({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        credits: user.credits
      });
      alert("User Updated Successfully!");
    }).catch((e)=>{
      console.log(e);
    }
      
    ).catch((e)=>{
      console.log(e);
    });
  }

  liveHouse(ad: Card|undefined, rentee: User|undefined){
    var id = this.db.createPushId();
    if(ad?.id==undefined||rentee?.id ==undefined){
      alert("Please fill all the fields!");
      return;
    }
    this.db.object('ownedHouses/'+id).set({
      ad:ad.id,
      uid:rentee.id,
      payments: {
        'January': {
          'status': 'none',
          'image':''
        },
        'February': {
          'status': 'none',
          'image':''
        },
        'March': {
          'status': 'none',
          'image':''
        },
        'April': {
          'status': 'none',
          'image':''
        },
        'May': {
          'status': 'none',
          'image':''
        },
        'June': {
          'status': 'none',
          'image':''
        },
        'July': {
          'status': 'none',
          'image':''
        },
        'August': {
          'status': 'none',
          'image':''
        },
        'September': {
          'status': 'none',
          'image':''
        },
        'October': {
          'status': 'none',
          'image':''
        },
        'November': {
          'status': 'none',
          'image':''
        },
        'December': {
          'status': 'none',
          'image':''
        }}
    }).then(()=>{
      this.db.object('rentee/'+rentee.key).update({
        id:rentee.id,
        email:rentee.email,
        password:rentee.password,
        cnic: rentee.cnic,
        number:rentee.number,
        owned:true
      })
    });
  }

  // // add student
  // addUser(user: User, userid: any) {
  //   if(user.email == "" || user.credits == 0 || user.password == "" || user.name == ""){
  //     alert("Please fill all the fields!");
  //     return;
  //   }
  //   this.db.object('users/'+userid).set({
  //       id: userid, 
  //       name: user.name,
  //       email: user.email,
  //       password: user.password,
  //       credits:user.credits,
  //     });
  // }
  addReport(inspection: any, uid:string, adid:string) {
    var id = this.db.createPushId();
    if(inspection.overall == 0 || inspection.tilework == 0 || inspection.walls == 0 || inspection.woodwork == 0 || inspection.paint == 0 
       || inspection.water == 0 || inspection.severage == 0 || inspection.electricity == 0 ){
      alert("Please fill all the fields!");
      return;
    }
    this.db.object('inspectionReports/'+id).set({
        userId:uid,
        id:adid,
        overall:inspection.overall,
        tilework:inspection.tilework,
        walls:inspection.walls,
        woodwork:inspection.woodwork,
        electricity:inspection.electricity,
        water:inspection.water,
        severage:inspection.severage,
        paint:inspection.paint
      }).then(()=>
        this.deletePending(uid)
      );
    
  }

  async deletePending(uid:string) {
    await this.db.object('pending/'+uid).remove();
  }

  // get all students
  getAllads() {
    return this.db.database.ref('ads');
  //   return this.httpClient.get('https://e-card-da934-default-rtdb.firebaseio.com/cards');
  }

  uploadAgreement(url: string, list:any){
    // console.log(list[0].uid.id)
    var id = this.db.createPushId();
    this.db.object('Agreements/'+id).set({
      'url':url,
      'renteeId':list[0].uid.id,
      'renterId':list[0].adid.creatorId,
    })
  }
  getAllrenters() {
    // this.db.database.ref('cards').orderByChild('creatorId').equalTo('asdasdsadas').on('value',snapshotChanges => )
    return this.db.database.ref('renter');
  }

  getOwnedHouses(): Observable<any[]> {
    return this.db.list<any>('ownedHouses').valueChanges();
  }

  getOwnedHouse() {
    return this.db.database.ref('ownedHouses');
  }
  
  check(list:any){
    this.db.object('ownedHouses/'+list.key).update({
      ad:list['ad'],
      uid:list['uid'],
      payments: list['payments']
    })
  }
  
  getAllusers() {
    // this.db.database.ref('cards').orderByChild('creatorId').equalTo('asdasdsadas').on('value',snapshotChanges => )
    return this.db.database.ref('rentee');
    
    // new Promise((resolve, reject)=> {
    //   this.db.list('users').valueChanges().subscribe(value=>{
    //     resolve(value);
    //   });
    // });

  //   return this.httpClient.get('https://e-card-da934-default-rtdb.firebaseio.com/cards');
  }

  // delete student
  async deleteCard(cardid : string) {
    await this.db.object('cards/'+cardid).remove();
  }

  async deleteUser(user:any){
    await this.fAuth.signInWithEmailAndPassword(user.email, user.password).then(
      res=>{
        this.fAuth.currentUser.then(response => {
          response?.delete();
        });
      }
    ).then(()=>{
      this.db.object('users/'+user.id).remove();
      alert("User Deleted Successfully!");
    });
  }
  
  // updateCard(card:Card, cardid:string){
  //   if(card.title == "" || card.city == "" || card.contact == "" || card.description =="" || card.state == "" || card.type == "" || card.imageUrl == "" || card.latitude == ""||card.longitude==""|| card.email=="" ){
  //     alert("Please fill all the fields!");
  //     return;
  //   }
  //   this.db.object('cards/'+cardid).update(
  //     {
  //       title: card.title,
  //       email: card.email,
  //       contact: card.contact,
  //       description: card.description,
  //       imageUrl: card.imageUrl,
  //       latitude: card.latitude,
  //       longitude: card.longitude,
  //       state: card.state,
  //       city: card.city,
  //       type: card.type
  //     }
  //   );
  // }
}
