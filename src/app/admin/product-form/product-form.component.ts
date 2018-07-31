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
  product = {};
  id;
  constructor(
    categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.categories$ = categoryService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).valueChanges().subscribe(p => this.product = p);
    } else {
      this.product = {
        title: '',
        catetory: '',
        imageUrl: '',
        price: ''
      };
    }
  }

  ngOnInit() {
  }

  save(product) {

    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }
  delete() {
    if (!confirm('Are your sure that you want to delete it? ')) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
