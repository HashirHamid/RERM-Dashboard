import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-inspection-report',
  templateUrl: './inspection-report.component.html',
  styleUrls: ['./inspection-report.component.css']
})
export class InspectionReportComponent implements OnInit {
  constructor(private data:DataService,private router:Router, private route:ActivatedRoute){}

  uid: any = '';
  adid: any = '';

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.adid = this.route.snapshot.paramMap.get('adid');
  }

  inspection = {
    tilework: 0,
    woodwork: 0,
    walls: 0,
    overall: 0,
    water: 0,
    electricity:0,
    severage: 0,
    paint:0

  }; // Object to store inspection data

  submitForm() {
    this.data.addReport(this.inspection, this.uid, this.adid);
    
    this.router.navigateByUrl("/cardsList");
  }

  

}
