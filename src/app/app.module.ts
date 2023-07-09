import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat'
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage} from '@angular/fire/storage';
import { ResellerDashboardComponent } from './component/reseller-dashboard/reseller-dashboard.component';
import { RenterDashboardComponent } from './component/renter-dashboard/renter-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { CardsListComponent } from './component/cards-list/cards-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InspectionReportComponent } from './component/inspection-report/inspection-report.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PendingReportsComponent } from './component/pending-reports/pending-reports.component';
import { LiveHousesComponent } from './component/live-houses/live-houses.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaymentsComponent } from './payments/payments.component';

import { MatDialogModule } from '@angular/material/dialog';
import { ImageModalComponent } from './imagemodal/imagemodal.component';


@NgModule({
  declarations: [
    AppComponent,
    ResellerDashboardComponent,
    RenterDashboardComponent,
    LoginComponent,
    
    CardsListComponent,
    InspectionReportComponent,
    PendingReportsComponent,
    LiveHousesComponent,
    PaymentsComponent,
    ImageModalComponent,

  ],
  imports: [
    MatProgressSpinnerModule,
    AppRoutingModule,
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    Ng2SearchPipeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
