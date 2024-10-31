import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, output, Output, ViewChild } from '@angular/core';
import { StaticProductService } from '../../../Services/StaticProdduct/StaticProduct.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cartViewModel, ICategory, IProduct } from '../../../Models/IProduct';
import { ProductsService } from '../../../Services/Products/Products.service';

@Component({
  selector: 'app-Productlist',
  templateUrl: './Productlist.component.html',
  styleUrls: ['./Productlist.component.css']
})

//npm install json-server   npx json-server db.json
export class ProductlistComponent  {
  constructor( ) { 
    
  }


 
}  

