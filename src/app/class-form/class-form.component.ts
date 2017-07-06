import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Input, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/animations';


@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css'],
  animations: [fadeInAnimation]

})
export class ClassFormComponent implements OnInit {

classForm: NgForm;
  @ViewChild('classForm') currentForm: NgForm;

  successMessage: string;
  errorMessage: string;

  class: object = {};
  instructor: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("class", +params['id']))
      .subscribe(classes => this.class = classes);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getInstructor();
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  
  }

  saveClass(id){
    if(typeof id === "number"){
      this.dataService.editRecord("class", this.class, id)
          .subscribe(
            classes => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("class", this.class)
          .subscribe(
            classes => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.class = {};
    this.classForm.reset();
    
  }

@Input() instructors;

getInstructor(){
    this.dataService.getRecords("instructor")
    .subscribe(
        instructor => {
          this.instructor = instructor;  
        },
        error =>  {
          this.errorMessage = <any>error; 
          console.log(this.errorMessage)
        }
    );
  }

compareInstructorId(m1, m2){
    if (m1 != undefined && m2 != undefined) {
      return m1.instructor_id === m2.instructor_id;
    }
  }

 ngAfterViewChecked() {
    this.formChanged();
  }


 formChanged() {
    this.classForm = this.currentForm;
    this.classForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.classForm.form;

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
    'instructor_id': '',
    'subject': '',
    'course': '',
  };

  validationMessages = {
  'instructor_id': {
     'required': 'Instructor is required.',
     'minlength': 'First name must be at least 2 characters long.',
     'maxlength': 'First name cannot be more than 30 characters long.'
   },
    'subject': {
      'required': 'Subject is required.',
      'minlength': 'Subject must be at least 2 characters long.',
      'maxlength': 'Subject cannot be more than 30 characters long.'
    },
    'course': {
      'required': 'Course is required',
      'maxlength': 'Course cannot be more than 3 characters long.'
    },
  
  };

}
