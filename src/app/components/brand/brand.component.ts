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
  dataLoaded:boolean = false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.brandService.getProducts().subscribe(response=>{
      this.brands=response.data;
      this.dataLoaded=true;
    })
  }
}
