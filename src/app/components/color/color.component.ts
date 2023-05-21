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
  dataLoaded:boolean = false;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.colorService.getProducts().subscribe(response=>{
      this.colors=response.data;
      this.dataLoaded=true;
    })
  }
}
