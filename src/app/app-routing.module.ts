import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HandlingGuestComponent } from './landing/handling-guest/handling-guest.component';
import { PlannerComponent } from './landing/planner/planner.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'soyinvitado', component: HandlingGuestComponent },
  { path: 'planner', component: PlannerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
