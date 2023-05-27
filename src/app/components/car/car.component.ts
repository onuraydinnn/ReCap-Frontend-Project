import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
    
  constructor(private carService: CarService,
    private activatedRoute:ActivatedRoute) {}

  cars:Car[] = [];
  dataLoaded:boolean = false;
  filterText:string="";
  baseImagePath:string = "https://localhost:44347/CarImages/";
  defaultImagePath:string = "https://localhost:44347/CarImages/DefaultImage.jpg";

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsByBrandAndColorId(params["brandId"], params["colorId"])
      }
      else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"]);
      }
      else if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"])
      }
      else{
        this.getCars();
      }
    })

  }


  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByBrandAndColorId(brandId:number, colorId:number){
    this.carService.getCarsByBrandAndColor(brandId, colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }

  getCarsByColorId(colorId:number){
    this.carService.getCarsByColorId(colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

}
