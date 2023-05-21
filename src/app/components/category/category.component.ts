import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {


  @Output() NumberEvent = new EventEmitter<string>();


  setNumber(value:string){
    this.NumberEvent.emit(value);
  }
}
