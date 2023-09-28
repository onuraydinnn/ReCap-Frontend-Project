import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = "https://localhost:44347/api/Colors/";

  constructor(private httpClient:HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>> {
    let newPath:string = this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  add(colorModel:Color):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath, colorModel)
  }

}
