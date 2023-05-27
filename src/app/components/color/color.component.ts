import { Component } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent {

  constructor(private colorService: ColorService) {}

  colors: Color[] = [];
  currentColor:Color;
  dataLoaded:boolean = false;
  filterText:"";

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }
  setCurrentColor(color:Color){
    this.currentColor = color;
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
  }


}
