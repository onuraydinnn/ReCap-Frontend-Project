import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent {

  constructor(private carService:CarService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private brandService:BrandService){}

  sayi:string="deneme";
  carAddForm:FormGroup;
  cars:Car[]
  carName:string;
  brands:Brand[];
  colors:Color[];
  years: number[] = Array.from({ length: 50 }, (_, index) => 1980 + index);

  ngOnInit():void{
    this.createCarAddForm();
    this.getCars();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
      carName:['', Validators.required],
      brandId:['', Validators.required],
      colorId:['', Validators.required],
      modelYear:['', Validators.required],
      dailyPrice:['', Validators.required]
    })}


    add(){
       if(this.carAddForm.valid){

        let carModel = Object.assign({},this.carAddForm.value);
        alert(carModel.brandId+carModel.colorId)
        // if(!this.checkIfExists()){
        //   this.carService.add(carModel).subscribe(response=>{

        //     this.toastrService.success("Araba eklendi", "Success");
        //   },responseError=>{
        //     if(responseError.error.Errors.length>0){
        //       for (let i = 0; i < responseError.error.Errors.length; i++) {
        //         this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası");
        //       }
            
        //     }})
        // }
        // else{
        //   this.toastrService.error("Bu Araba zaten var", "Error")
        // }
      }
      else{
        this.toastrService.error("Formunuz eksik","Error")
      }
    }


    getCars(){
      this.carService.getCars().subscribe(response=>{
        this.cars=response.data;
      })
    }

    getBrands(){
      this.brandService.getBrands().subscribe(response=>{
        this.brands=response.data;
      })
    }

    getColors(){
      this.colorService.getColors().subscribe(response=>{
        this.colors=response.data;
      })
    }

    checkIfExists():boolean{
      this.getCars()
      let carExists = this.cars.some(car=>car.carName.toUpperCase()===this.carName.toUpperCase())
      return carExists;
    }


}
