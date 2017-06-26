import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { StudentComponent }   from '../student/student.component';
import { StudentFormComponent }   from '../student-form/student-form.component';
import { HomeComponent }   from '../home/home.component';
 
import { GradeComponent }   from '../grade/grade.component';
import { GradeFormComponent }   from '../grade-form/grade-form.component';

import { MajorClassComponent }   from '../major-class/major-class.component';
import { MajorClassFormComponent }   from '../major-class-form/major-class-form.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  
  { path: 'student',  component: StudentComponent },
  { path: 'student/edit/:id', component: StudentFormComponent },
  { path: 'student/add', component: StudentFormComponent },

  { path: 'grade',  component: GradeComponent },
  { path: 'grade/edit/:id', component: GradeFormComponent },
  { path: 'grade/add', component: GradeFormComponent },

  { path: 'major-class',  component: MajorClassComponent },
  { path: 'major-class/edit/:id', component: MajorClassFormComponent },
  { path: 'major-class/add', component: MajorClassFormComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
