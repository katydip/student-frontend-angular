import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {

  assignmentForm: NgForm;
  @ViewChild('assignmentForm') currentForm: NgForm;


  successMessage: string;
  errorMessage: string;

  assignment: object = {};
  grade: object;
  student: object;
  classObj: object;



  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("assignment", +params['id']))
      .subscribe(assignment => this.assignment = assignment);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getGrades();
    this.getStudents();
    this.getClasses();

    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  
  }

  saveAssignment(id){
    if(typeof id === "number"){
      this.dataService.editRecord("assignment", this.assignment, id)
          .subscribe(
            assignment => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("assignment", this.assignment)
          .subscribe(
            assignment => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.assignment = {};
    this.assignmentForm.reset();
    
  }

  // I added this...

  @Input() assignments;
  @Input() classes;
  @Input() students;
  @Input() grades;



  getGrades(){
    this.dataService.getRecords("grade")
    .subscribe(
        grade => {
          this.grade = grade;  
        },
        error =>  {
          this.errorMessage = <any>error; 
          console.log(this.errorMessage)
        }
    );
  }

  compareGradeId(m1, m2){
    if (m1 != undefined && m2 != undefined) {
      return m1.grade_id === m2.grade_id;
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

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.assignmentForm = this.currentForm;
    this.assignmentForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.assignmentForm.form;

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
    'student': '',
    'assignment_nbr': '',
    'grade': '',
    'classObj': ''
  };

  validationMessages = {
    'student': {
      'required': 'Please select student.'
    },
    'assignment_nbr': {
      'required': 'Provide assignment number.'
    },
    'grade': {
      'required': 'Select a grade.'
     
    },
    'classObj': {
      'required': 'Select a class.'
    }
  };

}




