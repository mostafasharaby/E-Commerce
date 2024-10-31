import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/Product.service';
import { IProduct } from '../../../Models/IProduct';
import { SnakebarService } from '../../../Services/SnakeBar/Snakebar.service';

@Component({
  selector: 'app-AddProduct',
  templateUrl: './AddProduct.component.html',
  styleUrls: ['./AddProduct.component.css']
})
export class AddProductComponent implements OnInit {
  
    product: IProduct = {
      name: '',
      price: 0,
      count: 0,
      quantity: 0,
      categoryID: 0,
      type: '',
      stock: '',
      imgUrl:'',
      description: '',
      title:'',  
      prevPrice: 0,
      discount:0,
      totalprice:0,
      ratings: {
        rate: 0,
        count: 0
      }
    }

  ngOnInit() {
  }
  constructor(private productService: ProductService,
              private snakeService: SnakebarService
  ) {}

  addProduct() {
    this.productService.createProduct(this.product).subscribe(response => {
      this.snakeService.showSnakeBar("Product added successfully");
      //console.log('Product added successfully:', response);
    }, error => {
      this.snakeService.showSnakeBar("An Error occur please check the data");
      //console.error('Error adding product:', error);
    });
  }

  selectedImage: File | null = null;
    onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedImage = target.files[0];
      //console.log('Selected image:', this.selectedImage);
      this.product.imgUrl = '/'+this.selectedImage.name;
    }
  }
  
}
