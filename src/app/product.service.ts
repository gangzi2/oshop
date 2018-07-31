import { map } from 'rxjs/operators';

import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map(actions =>  actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
  }

  get(productId) {

    return this.db.object('/products/' + productId);

  }

}