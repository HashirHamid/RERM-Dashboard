import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CardsListComponent } from './component/cards-list/cards-list.component';
import { ResellerDashboardComponent } from './component/reseller-dashboard/reseller-dashboard.component';
import { RenterDashboardComponent } from './component/renter-dashboard/renter-dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { HasRoleGuard } from './has-role.guard';
import { InspectionReportComponent } from './component/inspection-report/inspection-report.component';
import { PendingReportsComponent } from './component/pending-reports/pending-reports.component';
import { LiveHousesComponent } from './component/live-houses/live-houses.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'cardsList', component: CardsListComponent, canActivate:[HasRoleGuard]},
  {path: 'resellerDash', component : ResellerDashboardComponent,canActivate:[HasRoleGuard]},
  {path: 'renterDash', component : RenterDashboardComponent,canActivate:[HasRoleGuard]},
  {path: 'liveHouses', component : LiveHousesComponent,canActivate:[HasRoleGuard]},
  {path: 'inspectionRep/:uid/:adid', component : InspectionReportComponent,canActivate:[HasRoleGuard]},
  {path: 'pending', component : PendingReportsComponent,canActivate:[HasRoleGuard]},
  {path: 'payments/:payments', component : PaymentsComponent,canActivate:[HasRoleGuard]},
  {path: 'login', component : LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
