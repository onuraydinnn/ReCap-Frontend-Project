import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"rentals", component:RentalComponent},
  {path:"customers", component:CustomerComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId", component:CarComponent},
  {path:"cars/carDetail/:carId", component:CarDetailComponent},
  {path:"rental/:carId", component:RentalComponent},
  {path:"payment/:carId", component:PaymentComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"colors/add", component:ColorAddComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
