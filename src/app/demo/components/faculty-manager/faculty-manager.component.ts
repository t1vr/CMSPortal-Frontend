import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem, MessageService } from 'primeng/api';
import { UserService } from '../../service/user.service';
import { UserItem } from 'src/app/models/tenant.model';

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

    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
