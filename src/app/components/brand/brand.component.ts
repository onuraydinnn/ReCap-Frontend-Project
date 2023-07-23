import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {

  constructor(private brandService: BrandService,
    private transferService:TransferService,
    private router:Router) {}

  brands: Brand[] = [];
  currentBrand:Brand;
  dataLoaded:boolean = false;
  filterText:"";

  ngOnInit(): void {
    this.getBrands();
    this.clearBrand();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
    this.setTransfer();
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
    this.setTransfer();
  }

  setTransfer(){
    this.transferService.brandId = this.currentBrand.brandId;
  }
  
  getTransfer(){
    return this.transferService.colorId;
  }
  
  route(){
    if(this.getTransfer()==0 && this.currentBrand.brandId!=0){
      this.router.navigate(['/cars/brand', this.currentBrand.brandId]);
    }
    else if(this.getTransfer()!=0 && this.currentBrand.brandId!=0){
      this.router.navigate(['/cars/brand', this.currentBrand.brandId,'color',this.getTransfer()]);
    }
    else if(this.getTransfer()!=0 && this.currentBrand.brandId==0){
      this.router.navigate(['/cars/color', this.getTransfer()])
    }
    else{
      this.router.navigate(['/cars']);
    }
  }
 


}