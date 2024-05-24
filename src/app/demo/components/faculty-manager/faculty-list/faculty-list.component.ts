import { Component, Input, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from 'src/app/demo/service/product.service';
import {  UserService } from 'src/app/demo/service/user.service';
import { FacultyUpsertComponent } from '../faculty-upsert/faculty-upsert.component';
import { MessageService } from 'primeng/api';
import { UserItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {
  layout: string = 'list';
  products: any;
  faculties: UserItem[];
  ref: DynamicDialogRef | undefined;

  constructor(private productService: ProductService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getAllFaculties();
  }

  onClickAddNewFacultyBtn() {
    this.ref = this.dialogService.open(FacultyUpsertComponent, {
      header: 'Faculty Information',
      width: '70%',
      baseZIndex: 10000,
      maximizable: true,
      closeOnEscape: true,

    });

    this.ref.onClose.subscribe((_) => {
      this.getAllFaculties();
      this.messageService.add({ severity: 'info', summary: 'Product Selected' });
    });
  }

  onClickEditFaculty(faculty: UserItem) {
    this.ref = this.dialogService.open(FacultyUpsertComponent, {
      header: 'Faculty Information',
      width: '70%',
      height: '70%',
      baseZIndex: 10000,
      maximizable: true,
      data: faculty
    });

    this.ref.onClose.subscribe((_) => {
      this.getAllFaculties();
      this.messageService.add({ severity: 'info', summary: 'Product Selected' });
    });
  }

  onClickDeleteBtn(userId) {
    this.userService.deleteUserById(userId).subscribe(x => {
      if (x.data) {
        this.getAllFaculties();
      }
    })
  }

  getAllFaculties() {
    this.userService.getAllUsers().subscribe(x => {
      if (x.data) {
        this.faculties = x.data;
      }
    })
  }

}
