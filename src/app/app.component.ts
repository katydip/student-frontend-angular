import { Component, Input } from '@angular/core';

import { StudentComponent } from './student/student.component'
import { GradeComponent } from './grade/grade.component'
import { MajorClassComponent } from './major-class/major-class.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input() erroMessage: string;
}
