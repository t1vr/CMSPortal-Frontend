import { Component, OnInit } from '@angular/core';
import { CurriculumItem } from 'src/app/models/tenant.model';

@Component({
  selector: 'app-curriculum-list',
  templateUrl: './curriculum-list.component.html',
  styleUrls: ['./curriculum-list.component.css']
})
export class CurriculumListComponent implements OnInit {
  curriculums: CurriculumItem[] = [];

  constructor() { }

  ngOnInit() {
  }

}
