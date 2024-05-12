import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/demo/service/product.service';
import { UserItem } from 'src/app/demo/service/user.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {
  layout: string = 'list';
  products: any;
  @Input() faculties: UserItem[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
  }

}
