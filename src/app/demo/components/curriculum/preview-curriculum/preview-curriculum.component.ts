import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CourseService } from 'src/app/demo/service/course.service';
import { CurrentUserService } from 'src/app/demo/service/current.user.service';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { UiMessageService } from 'src/app/demo/service/ui-message.service';
import { UserService } from 'src/app/demo/service/user.service';
import { CurriculumItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-preview-curriculum',
  templateUrl: './preview-curriculum.component.html',
  styleUrls: ['./preview-curriculum.component.css']
})
export class PreviewCurriculumComponent implements OnInit {
  curriculumId: number;
  curriculum: CurriculumItem;
  items: MenuItem[] | undefined;
  activeItem: MenuItem;
  constructor(private curriculumService: CurriculumService,
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uiMessageService: UiMessageService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.uiMessageService.getCurrentCurriculumId().subscribe(
      (curriculumId) => {
        this.curriculumId = curriculumId;
        this.getCurriculumById(this.curriculumId);
      }
    )
    this.items = [
      { label: 'Introduction', icon: 'pi pi-home' },
      { label: 'Summary', icon: 'pi pi-chart-line' },
      { label: 'Course list', icon: 'pi pi-chart-line' },
      { label: 'Misc', icon: 'pi pi-chart-line' },
    ]

    this.activeItem = this.items[0];
  }
  getCurriculumById(curriculumId: number) {
    this.curriculumService.getCurriculumById(curriculumId).subscribe(x => {
      if (x.data) {
        this.curriculum = x.data;
      }
    })
  }


  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
