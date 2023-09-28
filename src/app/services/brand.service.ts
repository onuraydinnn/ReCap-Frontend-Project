import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


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


  add(brandModel:Brand):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath, brandModel)
  }




}
