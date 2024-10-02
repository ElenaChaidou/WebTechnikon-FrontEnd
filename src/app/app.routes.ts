import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { OwnerHomeComponent } from './owner-home/owner-home.component';
import { OwnerComponent } from './owner/owner.component';
import { CreatePropertyComponent } from './create-property/create-property.component';
import { DeleteOwnerComponent } from './delete-owner/delete-owner.component';
import { UpdatePropertyComponent } from './update-property/update-property.component';
import { RepairsComponent } from './repairs/repairs.component';
// import { UpdateOwnerComponent } from './update-owner/update-owner.component';
// import { CreateOwnerComponent } from './create-owner/create-owner.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'admin-home', component: AdminHomeComponent }, 
  { path: 'owner-home', component: OwnerHomeComponent },  
  { path: 'owner', component: OwnerComponent }, 
  { path: 'create-property', component: CreatePropertyComponent },
  { path: 'update-property', component: UpdatePropertyComponent },
  { path: 'delete-owner', component: DeleteOwnerComponent },
  // { path: 'create-owner', component: CreateOwnerComponent },
  // { path: 'update-owner', component: UpdateOwnerComponent },
  { path: 'repairs', component: RepairsComponent },
  { path: 'home', component: HomeComponent }, 
  { path: '', redirectTo: '/owner-home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
