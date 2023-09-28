import { Component } from '@angular/core';
import { ColorService } from 'src/app/services/color.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent {

  constructor(private colorService:ColorService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder){}

  colorAddForm:FormGroup;
  colors:Color[]
  colorName:string;


  ngOnInit():void{
    this.createColorAddForm();
    this.getColors()
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["", Validators.required],
    })}


    add(){
       if(this.colorAddForm.valid){
        let colorModel = Object.assign({},this.colorAddForm.value);
        if(!this.checkIfExists()){
          this.colorService.add(colorModel).subscribe(response=>{

            this.toastrService.success("Renk eklendi", "Success");
          },responseError=>{
            if(responseError.error.Errors.length>0){
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası");
              }
            
            }})
        }
        else{
          this.toastrService.error("Bu renk zaten var", "Error")
        }
      }
      else{
        this.toastrService.error("Formunuz eksik","Error")
      }
    }


    getColors(){
      this.colorService.getColors().subscribe(response=>{
        this.colors=response.data;
      })
    }

    checkIfExists():boolean{
      this.getColors()
      let colorExists = this.colors.some(color=>color.colorName.toUpperCase()===this.colorName.toUpperCase())
      return colorExists;
    }

    

}
