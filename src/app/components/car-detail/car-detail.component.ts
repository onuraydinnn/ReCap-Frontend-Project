import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent {

  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute:ActivatedRoute) {}

  cars:Car[] = [];
  carImages:CarImage[] = [];
  carDetail:Car;
  dataLoaded:boolean = false;
  baseImagePath:string = "https://localhost:44347/CarImages/";
  defaultImagePath:string = "https://localhost:44347/CarImages/DefaultImage.jpg";

   
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params=>{  
        this.getCarDetailByCarId(params["carId"]);
        this.getCarImagesByCarId(params["carId"]); 
    })
    
  }

  getCarDetailByCarId(carId:number){
    this.carService.getCarDetailByCarId(carId).subscribe(response=>{
      this.carDetail=response.data;
      this.dataLoaded=true;
    })
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImages=response.data;
      this.dataLoaded=true;
    })
  }



}



