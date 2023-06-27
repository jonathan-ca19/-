import { Component, OnInit } from '@angular/core';
import { CreateProductDto, ProductModel, UpdateProductDto } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   products:ProductModel[] = [];
   selectedProduct:UpdateProductDto = {}; 

  constructor(private productService:ProductService) {
    this.initProduct();
  }
  
  ngOnInit(): void {
    this.getProducts();
    //this.getProduct();
    //this.createProduct();
    //this.updateProduct();
    //this.deleteProduct();
  }
  
  initProduct(): void {
    this.selectedProduct = {title:'', price:0, description:''};
  }


  getProducts(){
    const url = "https://api.escuelajs.co/api/v1/products";
    this.productService.getAll().subscribe(
      response =>{
        this.products = response;
        console.log(response);
      }
    )
  }
  getProduct(id: ProductModel['id'] ){
    const url = "https://api.escuelajs.co/api/v1/products/id";
    return this.productService.getOne(id).subscribe(
      response =>{
        console.log(response);
      }
    )
  }
  createProduct(product: CreateProductDto){
    this.productService.store(product).subscribe(
      response =>{
        console.log(response);
      }
    )
  } 
  updateProduct(id: ProductModel['id'], product:UpdateProductDto){
    this.productService.update(id, product).subscribe(
      response =>{
        console.log(response);
      }
    )
  }
  editProduct(product:ProductModel){
    this.selectedProduct = product;
  }
  
  deleteProduct(id: ProductModel['id']){
    this.productService.destroy(id).subscribe(
      response =>{
        this.products = this.products.filter(product => product.id != id); 
        //console.log(response);
      }
    )
  }
}

