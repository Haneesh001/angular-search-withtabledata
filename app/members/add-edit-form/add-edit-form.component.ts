


import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ErrorMatcherService, errorMessages } from '../../services/form-validation/form-validators.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Used for importing lists from the html.
import { countries } from '../../../server/countries-list';

import { UniqueNameService } from '../../services/unique-name.service';



@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  encapsulation: ViewEncapsulation.None
})



export class AddEditFormComponent implements OnInit {

  public addEditMemberForm: FormGroup;

  public matcher = new ErrorMatcherService();
  errors = errorMessages;  // Used on form html.


  // Used on form html.
  public countries = countries;

  public inDatabase;


  public formErrors = {
    first_name: '',
    last_name: '',
    user_name: '',
    country: '',
  };



  constructor(
    private fb: FormBuilder,
    public uniqueNameService: UniqueNameService,
  ) {
    // Conditional that monitors testing for unique name by service.
    this.uniqueNameService.inDatabase.subscribe(result => {
      this.inDatabase = result;  // When set to true it triggers the message.
      return result === true ? this.isTaken() : null;
    });
  }

  ngOnInit() {
    this.createForm();
    // Set the initial user name validation trigger to false - no message.
    this.inDatabase = this.uniqueNameService.inDatabase.value;
  }


  // The reactive model that is bound to the form.

  private createForm() {
    this.addEditMemberForm = this.fb.group({
      id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_name: ['', Validators.required],
      country: ['', Validators.required],
    });
  }




  // Check db if name is already taken.
  // If not then this.inDatabase = false (the trigger)
  //   and isTaken() isn't called.
  // Called from input blur property on template.

  public validateUsername(userName) {
    return this.uniqueNameService.validateUsername(userName);
  }



  // This runs if inDatabase = true shows a match.  
  // See template and subscription in constructor.

  private isTaken() {

    // Remove the "already in database" message after some time.
    setTimeout (() => {
      this.inDatabase = false;

      // Clear the field to reset validation and prepare for next attempt.
      this.addEditMemberForm.controls['user_name']
      .setValue(null);
    }, 3000);

  }

  
}



