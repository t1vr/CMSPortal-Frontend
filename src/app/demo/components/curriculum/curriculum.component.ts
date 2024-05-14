import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CurriculumItem, ProgramItem } from 'src/app/models/tenant.model';
import { CurriculumService } from '../../service/curriculum.service';
import { MessageService } from 'primeng/api';
import { CurriculumFormComponent } from './curriculum-form/curriculum-form.component';
import { ProgramService } from '../../service/program.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  providers: [DialogService, MessageService],
  styleUrls:['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {
  curriculums: CurriculumItem[] = [];
  programs: ProgramItem[] = [];

  ref: DynamicDialogRef | undefined;

  constructor(private curriculumService: CurriculumService,
    private programService: ProgramService,
    private dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getAllPrograms();
    this.getAllCurriculums();
  }

  getAllPrograms() {
    this.programService.getAllPrograms().subscribe(x => {
      if (x.data) {
        this.programs = x.data;
      }
    })
  }

  getAllCurriculums() {
    this.curriculumService.getAllCurriculums().subscribe(x => {
      if (x.data) {
        this.curriculums = x.data;
      }
    })
  }

  onClickCreateBtn() {
    this.ref = this.dialogService.open(CurriculumFormComponent, {
      header: 'Add a Curriculum',
      width: '70%',
      height: '70%',
      baseZIndex: 10000,
      maximizable: true,
      data: this.programs // Pass your data here
    });

    this.ref.onClose.subscribe((_) => {
      this.messageService.add({ severity: 'info', summary: 'Product Selected' });
    });
  }

}
