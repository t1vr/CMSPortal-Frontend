import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { BaseResponse, CurriculumForm, CreateCurriculumRequest, CurriculumItem, ProgramItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-curriculum-form',
  templateUrl: './curriculum-form.component.html',
  styleUrls: ['./curriculum-form.component.css'],
  providers: [MessageService]
})
export class CurriculumFormComponent implements OnInit {
  onSelectDuration() {
  }
  duration;
  programs: ProgramItem[] = [];
  curriculumForm: FormGroup<CurriculumForm>;

  constructor(private fb: FormBuilder,
    private curriculumService: CurriculumService,
    public messageService: MessageService,
    public dialogConfig: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.initForm();
    this.programs = this.dialogConfig.data;
  }

  initForm(): void {
    this.curriculumForm = this.fb.group<CurriculumForm>({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      duration: new FormControl(null, Validators.required),
      programIds: new FormControl([], Validators.required),
    });
  }

  onSubmitCurriculumForm(): void {
    let request = this.curriculumForm.value as CreateCurriculumRequest;
    request.effectiveFromYear = this.curriculumForm.value.duration.at(0);
    request.effectiveTillYear = this.curriculumForm.value.duration.at(1);

    this.curriculumService.createCurriculum(request)
      .subscribe((x: BaseResponse<CurriculumItem>) => {
        if (x.data) {
          this.messageService.add({ severity: 'info', summary: 'Program created successfully', life: 3000 });
          return;
        }
      })
  }
}



