import { Component } from '@angular/core';
import { BrandService } from 'src/app/services/brand.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent {

  constructor(private brandService:BrandService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder){}

  brandAddForm:FormGroup;
  brands:Brand[]
  brandName:string;


  ngOnInit():void{
    this.createBrandAddForm();
    this.getBrands()
  }

  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:["", Validators.required],
    })}


    add(){
       if(this.brandAddForm.valid){
        let brandModel = Object.assign({},this.brandAddForm.value);
        if(!this.checkIfExists()){
          this.brandService.add(brandModel).subscribe(response=>{

            this.toastrService.success("Marka eklendi", "Success");
          },responseError=>{
            if(responseError.error.Errors.length>0){
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası");
              }
            
            }})
        }
        else{
          this.toastrService.error("Bu marka zaten var", "Error")
        }
      }
      else{
        this.toastrService.error("Formunuz eksik","Error")
      }
    }


    getBrands(){
      this.brandService.getBrands().subscribe(response=>{
        this.brands=response.data;
      })
    }

    checkIfExists():boolean{
      this.getBrands()
      let brandExists = this.brands.some(brand=>brand.brandName.toUpperCase()===this.brandName.toUpperCase())
      return brandExists;
    }

    

}
