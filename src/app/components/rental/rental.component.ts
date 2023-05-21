import { Component } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent {
  constructor(private rentalService: RentalService) {}

  rentals: Rental[] = [];
  rentalDetails: RentalDetail[] = [];
  dataLoaded: boolean = false;

  ngOnInit(): void {
    this.getRentalDetails();
  }

  getProducts() {
    this.rentalService.getProducts().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  getRentalDetails() {
    this.rentalService.getRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded = true;
    });
  }
}
