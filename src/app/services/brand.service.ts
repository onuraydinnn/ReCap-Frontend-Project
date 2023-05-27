import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44347/api/Brands/";

  constructor(private httpClient:HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath:string = this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

}
