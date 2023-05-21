import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarResponseModel } from '../models/carResponseModel';
import { Observable } from 'rxjs';
import { CarDetailResponseModel } from '../models/carDetailResponseModel';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  apiUrl = "https://localhost:44347/api/Cars/getall";
  apiUrlCarDetails = "https://localhost:44347/api/Cars/getcardetails"

  constructor(private httpClient:HttpClient) { }

  getProducts(): Observable<CarResponseModel> {
    return this.httpClient.get<CarResponseModel>(this.apiUrl);
  }

  getCarDetails():Observable<CarDetailResponseModel>{
    return this.httpClient.get<CarDetailResponseModel>(this.apiUrlCarDetails);
  }


}
