import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/Product.service';
import { IProduct } from '../../../Models/IProduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-AdminProduct',
  templateUrl: './AdminProduct.component.html',
  styleUrls: ['./AdminProduct.component.css']
})
export class AdminProductComponent implements OnInit {

  products: IProduct[] = [];
  private productSubscription!: Subscription;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe(); 
      //console.log('Product subscription has been unsubscribed');
    }
  }


  loadProducts() {
    this.productSubscription =  this.productService.getProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data;
        //console.log("IProduct ",this.products)
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  
  createProduct(newProduct: IProduct) {
    this.productService.createProduct(newProduct).subscribe(
      (product: IProduct) => {
        this.products.push(product);
      },
      error => {
        console.error('Error creating product:', error);
      }
    );
  }

  updateProduct(updatedProduct: IProduct) {
    this.productService.updateProduct(updatedProduct).subscribe(
      () => {
        const index = this.products.findIndex(p => p.id === updatedProduct.productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
        }
      },
      error => {
        console.error('Error updating product:', error);
      }
    );
  }

 
  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(    
      () => {
        this.products = this.products.filter(p => p.id !== productId);
        this.closeConfirmationModal();  
      },
      error => {
        console.error('Error deleting product:', error);
      }
    );
  }

  showConfirmationModal: boolean = false;  
  confirmDeleteId: number | null = null; 
  confirmDelete(productId: number) {
    
    this.confirmDeleteId = productId;
    console.log('confirmDelete', productId);
    this.showConfirmationModal = true;
  }


  closeConfirmationModal() {
    this.showConfirmationModal = false;
    this.confirmDeleteId = null;
  }




  showModal: boolean = false;
  selectedProduct: IProduct | null = null;
  openEditModal(product: IProduct) {
    this.selectedProduct = { ...product }; 
    this.showModal = true;
  }


  closeModal() {
    this.showModal = false;
    this.selectedProduct = null;
  }


  saveChanges() {
    const index = this.products.findIndex(p => p.id === this.selectedProduct?.productId);
    console.log("selected product " , this.selectedProduct?.productId)
    console.log("index " , index)
    if (index !== -1 && this.selectedProduct) {
      this.products[index] = this.selectedProduct; 
      this.updateProduct(this.selectedProduct);
    }
    this.closeModal(); 
  }


}
