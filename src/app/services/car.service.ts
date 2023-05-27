import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { EntityResponseModel } from '../models/entityResponseModel';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  apiUrl = "https://localhost:44347/api/Cars/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath:string = this.apiUrl+"getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId:number): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"getbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number): Observable<ListResponseModel<Car>> {
    let newPath=this.apiUrl+"getbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandAndColor(brandId:number, colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getbybrandcolorid?brandId="+ brandId +"&colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailByCarId(carId:number):Observable<EntityResponseModel<Car>> {
    let newPath = this.apiUrl+"getcardetailbycarid?carId="+carId;
    return this.httpClient.get<EntityResponseModel<Car>>(newPath);
  }

  


}
