import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';


@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44347/api/CarImages/";

  constructor(private httpClient:HttpClient) {}


  getCarImagesByCarId(carId:number): Observable<ListResponseModel<CarImage>> {
    let newPath=this.apiUrl+"getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }


}
