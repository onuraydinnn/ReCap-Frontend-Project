import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent {

  constructor(private colorService: ColorService,
    private transferService:TransferService,
    private router:Router) {}

  colors: Color[] = [];
  currentColor:Color;
  dataLoaded:boolean = false;
  filterText:"";

  ngOnInit(): void {
    this.getColors();
    this.clearColor();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }
  setCurrentColor(color:Color){
    this.currentColor = color;
    this.setTransfer();
  }

  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  getAllColorClass(){
    if(!this.currentColor || this.currentColor.colorId==0){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

  clearColor(){
    let value:Color={colorId:0,colorName:""};
    this.currentColor=value;
    this.setTransfer();
  }

  setTransfer(){
    this.transferService.colorId = this.currentColor.colorId;
  }

  getTransfer():number{
    return this.transferService.brandId;
  }


  route(){
    if(this.getTransfer()==0 && this.currentColor.colorId!=0){
      this.router.navigate(['/cars/color', this.currentColor.colorId]);
    }
    else if(this.getTransfer()!=0 && this.currentColor.colorId!=0){
      this.router.navigate(['/cars/brand',this.getTransfer(),'color',this.currentColor.colorId]);
    }
    else if(this.getTransfer()!=0 && this.currentColor.colorId==0){
      this.router.navigate(['/cars/brand', this.getTransfer()])
    }
    else{
      this.router.navigate(['/cars']);
    }
  }




}
