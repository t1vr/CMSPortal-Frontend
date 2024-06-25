import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { ProgramService } from 'src/app/demo/service/program.service';
import { BaseResponse, CreateCurriculumRequest, CurriculumForm, CurriculumItem, ProgramItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-curriculum-summary',
  templateUrl: './curriculum-summary.component.html',
  styleUrls: ['./curriculum-summary.component.css'],
  providers: [MessageService]
})
export class CurriculumSummaryComponent implements OnInit {
  curriculumId: number;
  curriculum: CurriculumItem;
  programs: ProgramItem[] = [];
  curriculumForm: FormGroup<CurriculumForm>;

  constructor(private curriculumService: CurriculumService,
    private programService: ProgramService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public messageService: MessageService,) { }

  ngOnInit() {
    this.curriculumId = this.activatedRoute.snapshot.paramMap.get('curriculumId') as unknown as number;
    this.getCurriculumById(this.curriculumId);
    this.initForm();
    this.getAllPrograms();
  }


  initForm(): void {
    this.curriculumForm = this.fb.group<CurriculumForm>({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      duration: new FormControl(null, Validators.required),
      programIds: new FormControl([], Validators.required),
    });
  }

  getAllPrograms() {
    this.programService.getAllPrograms().subscribe(x => {
      if (x.data) {
        this.programs = x.data;
      }
    })
  }

  onSubmitCurriculumForm(): void {
    let request = this.curriculumForm.value as CreateCurriculumRequest;
    request.effectiveFromYear = this.curriculumForm.value.duration.at(0);
    request.effectiveTillYear = this.curriculumForm.value.duration.at(1);

    this.curriculumService.updateCurriculum(this.curriculumId, request)
      .subscribe((x: BaseResponse<CurriculumItem>) => {
        if (x.data) {
          this.messageService.add({ severity: 'info', summary: 'Curriculum updated successfully', life: 3000 });
          return;
        }
      })
  }

  getCurriculumById(curriculumId: number) {
    this.curriculumService.getCurriculumById(curriculumId).subscribe(x => {
      if (x.succeeded && x.data) {
        this.curriculum = x.data;
        console.log(x.data.effectiveFromYear, x.data.effectiveTillYear)
        let xx = [x.data.effectiveFromYear, x.data.effectiveTillYear]
        let programIds = [2, 3]
        let curriculumData = { ...x.data, programIds: programIds }
        console.log(curriculumData)
        this.curriculumForm.patchValue(curriculumData)
      }
    })
  }
}
