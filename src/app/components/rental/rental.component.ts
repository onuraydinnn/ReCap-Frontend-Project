import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent {
  
  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  rentals: Rental[] = [];
  rentalsDetail: RentalDetail[] = [];
  carDetail: Car;
  dataLoaded: boolean = false;
  buttonSpinner:boolean=false;
  baseImagePath: string = 'https://localhost:44347/CarImages/';
  defaultImagePath: string =
    'https://localhost:44347/CarImages/DefaultImage.jpg';
  selectedRentDate: string;
  selectedReturnDate: string;
  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params['carId']);
      this.getRentalsDetailByCarId(params['carId']);
    });
  }

  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  getRentalsDetailByCarId(carId: number) {
    this.rentalService.getRentalsDetailByCarId(carId).subscribe((response) => {
      this.rentalsDetail = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailByCarId(carId: number) {
    this.carService.getCarDetailByCarId(carId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
    });
  }

  
  check() {

    let selectedRentTime = this.calculateNumberOfDate(this.selectedRentDate);
    let selectedReturnTime = this.calculateNumberOfDate(this.selectedReturnDate);

    if (this.selectedRentDate == null || this.selectedReturnDate == null){
      this.toastrService.error("Tarih seçiniz","Error")
      return;
    }
    if (selectedRentTime >= selectedReturnTime) {
      this.toastrService.error('Teslim tarihi kiralama tarihinden önce olamaz!','Error');
      return;
    }
    for (let i = 0; i < this.rentalsDetail.length; i++) {
      let rentDate = this.clearTimeFromDate(this.rentalsDetail[i].rentDate);
      let returnDate = this.clearTimeFromDate(this.rentalsDetail[i].returnDate);
      let rentTime = this.calculateNumberOfDate(rentDate);
      let returnTime = this.calculateNumberOfDate(returnDate);

      if (!(selectedRentTime > returnTime || selectedReturnTime < rentTime)) {
        this.toastrService.error(`Bu araç ${rentDate} ve ${returnDate} tarihleri arasında kiralanmıştır!`,'Error');
        return;
      }
    }
    this.buttonSpinner=true;
    this.toastrService.success("Ödeme aşamasına geçiliyor",'Success');
    setTimeout(() => {
      this.router.navigate(['payment', this.carDetail.carId]);
    }, 3000);
  }

  clearTimeFromDate(date: string): string {
    let dateParts = date.split('T');
    date = dateParts[0];
    return date;
  }

  calculateDaysBetween(
    rentDateAsString: string,
    returnDateAsString: string
  ): number {
    let rentDate = new Date(rentDateAsString);
    let returnDate = new Date(returnDateAsString);
    let rentTime = rentDate.getTime();
    let ReturnTime = returnDate.getTime();
    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    let difference = Math.abs(ReturnTime - rentTime);
    let daysBetween = Math.round(difference / millisecondsPerDay);
    return daysBetween;
  }

  calculateNumberOfDate(dateAsString: string): number {
    let date = new Date(dateAsString);
    let time = date.getTime();
    let millisecondsPerDay = 24 * 60 * 60 * 1000;
    return Math.round(time / millisecondsPerDay);
  }

  calculateTotalPrice():number{
    let days = this.calculateDaysBetween(this.selectedRentDate, this.selectedReturnDate);
    let date1 = this.calculateNumberOfDate(this.selectedRentDate);
    let date2 = this.calculateNumberOfDate(this.selectedReturnDate);

    if(date1>=date2 || this.selectedRentDate==null || this.selectedReturnDate==null){
      return 0;
    }
    return days*this.carDetail.dailyPrice;
  }
  
}
