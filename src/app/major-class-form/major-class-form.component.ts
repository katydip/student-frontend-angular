import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DataService } from '../data.service'

@Component({
  selector: 'app-major-class-form',
  templateUrl: './major-class-form.component.html',
  styleUrls: ['./major-class-form.component.css']
})
export class MajorClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  major_class: object = {};
  major: object;
  classObj: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("major_class", +params['id']))
      .subscribe(major_class => this.major_class = major_class);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getMajors();
    this.getClasses();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  
  }

  saveMajorClass(id){
    if(typeof id === "number"){
      this.dataService.editRecord("major_class", this.major_class, id)
          .subscribe(
            major_class => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("major_class", this.major_class)
          .subscribe(
            major_class => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.major_class = {};
    
  }

  @Input() majors;
  @Input() classes;

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

}
