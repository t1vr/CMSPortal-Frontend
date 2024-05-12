import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CreateUserRequest, UserService } from 'src/app/demo/service/user.service';
import { CurriculumForm, FacultyForm } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-faculty-upsert',
  templateUrl: './faculty-upsert.component.html',
  styleUrls: ['./faculty-upsert.component.css']
})
export class FacultyUpsertComponent implements OnInit {

  facultyForm: FormGroup<FacultyForm>;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    public messageService: MessageService,
    public dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.initForm();
    // this.programs = this.dialogConfig.data;
  }

  initForm(): void {
    this.facultyForm = this.fb.group<FacultyForm>({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(null, Validators.required)
    });
  }

  onSubmitUserForm() {
    let facultyCreateRequest = this.facultyForm.value as CreateUserRequest;
    this.userService.createUser(facultyCreateRequest).subscribe(x => {
      if (x.data) {
        this.messageService.add({ severity: 'info', summary: 'Faculty created successfully', life: 3000 });
        return;
      }
    })
  }

}


