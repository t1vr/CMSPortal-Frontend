import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/demo/service/user.service';
import { CreateUserRequest, FacultyForm, UpdateUserRequest, UserItem, designationsData, rolesData } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-faculty-upsert',
  templateUrl: './faculty-upsert.component.html',
  styleUrls: ['./faculty-upsert.component.css']
})
export class FacultyUpsertComponent implements OnInit {

  facultyForm: FormGroup<FacultyForm>;
  roles: any[] = [];
  designations: any[] = [];
  items: MenuItem[] | undefined;
  activeItem: MenuItem;
  faculty: UserItem;
  isLoading: boolean;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    public messageService: MessageService,
    public dialogConfig: DynamicDialogConfig,
    private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.faculty = this.dialogConfig.data;
    this.initForm();
    if (this.faculty) {
      let data = {
        firstName: this.faculty.firstName,
        lastName: this.faculty.lastName,
        email: this.faculty.email,
        designation: this.faculty.designation,
        phoneNumber: this.faculty.phoneNumber,
        roles: this.faculty.roles,
      }
      this.facultyForm.setValue(data)
    }
    this.items = [
      { label: 'General' },
      { label: 'Contact' },
    ]

    this.activeItem = this.items[0];
    this.designations = designationsData;
    this.roles = rolesData;
  }

  initForm(): void {
    this.facultyForm = this.fb.group<FacultyForm>({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(null, Validators.required),
      designation: new FormControl(null),
      phoneNumber: new FormControl(null),
      roles: new FormControl(),
    });
  }

  onSubmitUserForm() {
    this.isLoading = true;
    if (!this.faculty) {
      let facultyCreateRequest = this.facultyForm.value as CreateUserRequest;

      this.userService.createUser(facultyCreateRequest).subscribe(x => {
        if (x.data) {
          this.isLoading = false;
          this.closeModal();
          this.messageService.add({ severity: 'info', summary: 'Faculty created successfully', life: 3000 });
          return;
        }
      })
    }
    else {
      let facultyUpdateRequest = this.facultyForm.value as UpdateUserRequest;

      this.userService.updateUserById(this.faculty.id, facultyUpdateRequest).subscribe(x => {
        if (x.data) {
          this.isLoading = false;
          this.closeModal();
          this.messageService.add({ severity: 'info', summary: 'Faculty updated successfully', life: 3000 });
          return;
        }
      })
    }


  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  closeModal() {
    this.ref.close();
  }
}


