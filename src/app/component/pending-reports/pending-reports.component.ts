import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-pending-reports',
  templateUrl: './pending-reports.component.html',
  styleUrls: ['./pending-reports.component.css']
})
export class PendingReportsComponent implements OnInit {

  
  cards$ = this.data.list('pending').valueChanges();
  constructor(private data:AngularFireDatabase) { }

  ngOnInit(): void {
  }

}
