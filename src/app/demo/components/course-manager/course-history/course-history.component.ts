import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CourseService } from 'src/app/demo/service/course.service';
import { CurriculumService } from 'src/app/demo/service/curriculum.service';
import { CourseItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-course-history',
  templateUrl: './course-history.component.html',
  styleUrls: ['./course-history.component.css']
})
export class CourseHistoryComponent implements OnInit {

  courseRevisions: CourseItem[] = [];
  courseId: number;
  events: any[];

  constructor(private courseService: CourseService,
    private activatedRoute: ActivatedRoute) {
    this.events = [
      { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
  }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId') as unknown as number;
    this.getAllCourseRevisionsByCourseId(this.courseId);
  }

  getAllCourseRevisionsByCourseId(courseId: number) {
    this.courseService.getCourseRevisionsByCourseId(courseId).subscribe(x => {
      if (x.data) {
        this.courseRevisions = x.data;
      }
    })
  }

}
