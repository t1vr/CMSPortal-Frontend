import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-history',
  templateUrl: './course-history.component.html',
  styleUrls: ['./course-history.component.css']
})
export class CourseHistoryComponent implements OnInit {

  events: any[];

  constructor() {
    this.events = [
      { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];
  }

  ngOnInit() {
  }

}
