import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { ProgramService } from 'src/app/demo/service/program.service';
import { BaseResponse, CurriculumForm, CreateCurriculumRequest, CurriculumItem, ProgramItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-curriculum-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.css']
})
export class CurriculumFormComponent implements OnInit {

  programs: ProgramItem[] = [];
  curriculumForm: FormGroup<CurriculumForm>;

  constructor(private fb: FormBuilder,
    private curriculumService: CurriculumService,
    public messageService: MessageService,
    public dialogConfig: DynamicDialogConfig) { }

  ngOnInit() {
    this.initForm();
    this.programs = this.dialogConfig.data;
    console.log(this.programs)
  }

  initForm() {
    this.curriculumForm = this.fb.group<CurriculumForm>({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      programs: new FormControl([], Validators.required),
    });
  }



  onSubmitCurriculumForm(): void {
    this.curriculumService.createCurriculum(this.curriculumForm.value as CreateCurriculumRequest)
      .subscribe((x: BaseResponse<CurriculumItem>) => {
        if (x.data) {
          this.messageService.add({ severity: 'info', summary: 'Program created successfully', life: 3000 });
          return;
        }
      })
  }
}



