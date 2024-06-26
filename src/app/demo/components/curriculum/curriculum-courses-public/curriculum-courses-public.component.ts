import { Component, Input, OnInit } from '@angular/core';
import { CourseItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-curriculum-courses-public',
  templateUrl: './curriculum-courses-public.component.html',
  styleUrls: ['./curriculum-courses-public.component.css']
})
export class CurriculumCoursesPublicComponent implements OnInit {
@Input() courses: CourseItem[];

  constructor() { }

  ngOnInit() {
  }

}
