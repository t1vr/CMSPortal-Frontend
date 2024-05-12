import { Component, OnInit } from '@angular/core';
import { FacultyUpsertComponent } from './faculty-upsert/faculty-upsert.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { UserItem, UserService } from '../../service/user.service';

@Component({
  selector: 'app-faculty-manager',
  templateUrl: './faculty-manager.component.html',
  styleUrls: ['./faculty-manager.component.scss'],
  providers: [DialogService, MessageService]
})
export class FacultyManagerComponent implements OnInit {
  faculties: UserItem[];
  items: MenuItem[] | undefined;
  activeItem: MenuItem;
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService,
    private messageService: MessageService,
    private userService: UserService) { }

  ngOnInit() {
    this.items = [
      { label: 'Faculties', icon: 'pi pi-home' },
      { label: 'Upcoming', icon: 'pi pi-chart-line' },
    ]

    this.getAllFaculties();
    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  onClickAddNewFacultyBtn() {
    this.ref = this.dialogService.open(FacultyUpsertComponent, {
      header: 'Add Faculty Information',
      width: '70%',
      height: '70%',
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((_) => {
      this.getAllFaculties();
      this.messageService.add({ severity: 'info', summary: 'Product Selected' });
    });
  }

  getAllFaculties() {
    this.userService.getAllUsers().subscribe(x => {
      if (x.data) {
        this.faculties = x.data;
      }
    })
  }

}
