import { Component } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  constructor(private brandService: BrandService) {}

  brands: Brand[] = [];
  currentBrand:Brand;
  dataLoaded:boolean = false;
  filterText:"";

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(brand==this.currentBrand){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand || this.currentBrand.brandId==0){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  clearBrand(){
    let value:Brand={brandId:0,brandName:""};
    this.currentBrand=value;
  }


}
