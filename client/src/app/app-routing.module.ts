import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousesComponent } from './houses/houses.component';
import { PersonsComponent } from './persons/persons.component';
import { QuotesComponent } from './quotes/quotes.component';
import { HouseMembersComponent } from './house-members/house-members.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'houses', component: HousesComponent },
  { path: 'houses/:slug', component: HouseMembersComponent },
  { path: 'persons', component: PersonsComponent },
  { path: 'characters/:slug', component: CharacterDetailsComponent },
  { path: 'quotes', component: QuotesComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
