import { take } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {
    title: '',
    catetory: '',
    imageUrl: '',
    price: ''
  };
  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.categories$ = categoryService.getCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.get(id).valueChanges().subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
