import { Component, ViewChild  } from '@angular/core';
import { CategoryComponent } from './components/category/category.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sql';
  number="";
  setNumber(value:string) {
    this.number=value;
  }

}
