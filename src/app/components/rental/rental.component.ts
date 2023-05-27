import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent {
  constructor(private rentalService: RentalService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute) {}

  rentals: Rental[] = [];
  carDetail:Car;
  dataLoaded: boolean = false;
  baseImagePath:string = "https://localhost:44347/CarImages/";
  defaultImagePath:string = "https://localhost:44347/CarImages/DefaultImage.jpg";


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{  
      this.getCarDetailByCarId(params["carId"]);
  })
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailByCarId(carId:number){
    this.carService.getCarDetailByCarId(carId).subscribe(response=>{
      this.carDetail=response.data;
      this.dataLoaded=true;
    })
  }



}
