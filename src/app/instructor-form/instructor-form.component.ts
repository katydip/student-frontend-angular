import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DataService } from '../data.service'

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})

export class InstructorFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  instructor: object = {};

  major: object;
  

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("instructor", +params['id']))
      .subscribe(instructor => this.instructor = instructor);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getMajors();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  }

  saveInstructor(id){
    if(typeof id === "number"){
      this.dataService.editRecord("instructor", this.instructor, id)
          .subscribe(
            instructor => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("instructor", this.instructor)
          .subscribe(
            instructor => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.instructor = {};
    
  }

  @Input() majors;

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
