import { Component, OnInit } from '@angular/core';
import { ProgramItem } from 'src/app/models/tenant.model';
import { ProgramService } from '../../service/program.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProgramFormComponent } from '../program-form/program-form.component';

@Component({
  selector: 'app-program-manager',
  templateUrl: './program-manager.component.html',
  providers: [DialogService, MessageService]

})
export class ProgramManagerComponent implements OnInit {

  programs: ProgramItem[];
  ref: DynamicDialogRef | undefined;

  constructor(private programService: ProgramService,
    private dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit() {
    // this.tenantService.getCurrentTenantIdentifier()
    //   .pipe(
    //     switchMap(_ => this.programService.getAllPrograms())
    //   )
    //   .subscribe(x => {
    //     if (x.data) {
    //       this.programs = x.data;
    //     }
    //   })
    this.getAllPrograms();
  }

  getAllPrograms() {
    this.programService.getAllPrograms().subscribe(x => {
      if (x.data) {
        this.programs = x.data;
      }
    })
  }

  onClickCreateBtn() {
    this.ref = this.dialogService.open(ProgramFormComponent, {
      header: 'Add a Program',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe((_) => {
      this.messageService.add({ severity: 'info', summary: 'Product Selected' });
    });
  }
}
