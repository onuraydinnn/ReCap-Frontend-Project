import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';


@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44347/api/Rentals/";
  

  constructor(private httpClient:HttpClient) { }


  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath:string = this.apiUrl+"getrentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalsDetailByCarId(carId:number): Observable<ListResponseModel<RentalDetail>> {
    let newPath:string = this.apiUrl+"getallbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

}
