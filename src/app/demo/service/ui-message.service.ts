import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiMessageService {

  private currentCurriculumId = new BehaviorSubject<number>(null);

  sendCurrentCurriculumId(currentCurriculumId: number) {
    this.currentCurriculumId.next(Number(currentCurriculumId));
  }

  getCurrentCurriculumId(): Observable<number> {
    return this.currentCurriculumId.asObservable();
  }

}
