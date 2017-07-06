import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-student-class-form',
  templateUrl: './student-class-form.component.html',
  styleUrls: ['./student-class-form.component.css']
})
export class StudentClassFormComponent implements OnInit {

  studentClassForm: NgForm;
  @ViewChild('studentClassForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  student_class: object = {};
  classObj: object;
  student: object;


  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("student_class", +params['id']))
      .subscribe(student_class => this.student_class = student_class);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getClasses();
    this.getStudents();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveStudentClass(id){
    if(typeof id === "number"){
      this.dataService.editRecord("student_class", this.student_class, id)
          .subscribe(
            student_class => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("student_class", this.student_class)
          .subscribe(
            student_class => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.student_class = {};
    this.studentClassForm.reset();
    
  }

@Input() classes;
@Input() students;

getClasses(){
    this.dataService.getRecords("class")
    .subscribe(
        classObj => {
          this.classObj = classObj;  
        },
        error =>  {
          this.errorMessage = <any>error; 
          console.log(this.errorMessage)
        }
    );
  }

compareClassId(m1, m2){
    if (m1 != undefined && m2 != undefined) {
      return m1.class_id === m2.class_id;
    }
  }

getStudents(){
    this.dataService.getRecords("student")
    .subscribe(
        student => {
          this.student = student;  
        },
        error =>  {
          this.errorMessage = <any>error; 
          console.log(this.errorMessage)
        }
    );
  }

compareStudentId(m1, m2){
    if (m1 != undefined && m2 != undefined) {
      return m1.student_id === m2.student_id;
    }
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.studentClassForm = this.currentForm;
    this.studentClassForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.studentClassForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'student_id': '',
    'class_id': '',
  };

  validationMessages = {
    'student_id': {
      'required': 'Student is required.'
    },
    'class_id': {
      'required': 'Class is required.'
    }
  };

}
