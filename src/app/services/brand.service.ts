import { Injectable } from '@angular/core';
import { BrandResponseModel } from '../models/brandResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44347/api/Brands/getall";

  constructor(private httpClient:HttpClient) { }

  getProducts(): Observable<BrandResponseModel> {
    return this.httpClient.get<BrandResponseModel>(this.apiUrl);
  }

}
