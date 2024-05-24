import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BaseResponse, CreateProgramRequest, ProgramItem } from 'src/app/models/tenant.model';
import { ProgramService } from '../../service/program.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-program-form',
  templateUrl: './program-form.component.html',
  styleUrls: ['./program-form.component.css']
})
export class ProgramFormComponent implements OnInit {
  programForm: FormGroup<ProgramForm>;

  constructor(private fb: FormBuilder,
    private programService: ProgramService,
    public messageService: MessageService,
    private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.programForm = this.fb.group<ProgramForm>({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  onSubmitProgramForm(): void {
    this.programService.createProgram(this.programForm.value as CreateProgramRequest)
      .subscribe((x: BaseResponse<ProgramItem>) => {
        if (x.data) {
          this.messageService.add({ severity: 'info', summary: 'Program created successfully', life: 3000 });
          return;
        }
      })
  }

  closeModal(){
    this.ref.close();
  }
}


interface ProgramForm {
  name: FormControl<string>;
  description: FormControl<string>;
}

