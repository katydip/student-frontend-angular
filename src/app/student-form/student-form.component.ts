import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DataService } from '../data.service'

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  student: object = {};
  major: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("student", +params['id']))
      .subscribe(student => this.student = student);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getMajors()
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  
  }

  saveStudent(id){
    if(typeof id === "number"){
      this.dataService.editRecord("student", this.student, id)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("student", this.student)
          .subscribe(
            student => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.student = {};
    
  }
// i added this... 

@Input() students;

  getMajors(){
    this.dataService.getRecords("major")
    .subscribe(
        major => {
          this.major = major;  
        },
        error =>  {
          this.errorMessage = <any>error; 
          console.log(this.errorMessage)
        }
    );
  }

compareMajorId(m1, m2){
    if (m1 != undefined && m2 != undefined) {
      return m1.major_id === m2.major_id;
    }
  }

}
