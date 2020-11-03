


//  Child components process their own data, not the main-processor service.

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef} from '@angular/material';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';

import { HttpService } from '../../http.service';
import { MessagesService } from '../../services/messages-service/messages.service';
import { FormErrorsService } from '../../services/form-validation/form-errors.service';




@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  encapsulation: ViewEncapsulation.None
})


export class AddMemberComponent {

  @ViewChild(AddEditFormComponent)
  public addMemberForm: AddEditFormComponent;

  private membersUrl = 'api/members';
  private dbTable = 'members';

  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<AddMemberComponent>,  // Used by the html component.
    private messagesService: MessagesService,
    public formErrorsService: FormErrorsService
  ) { }


  reset() {
    this.addMemberForm.addEditMemberForm.reset();
  }

  //  Processes form data and sends it to the server and db.

  public save(addMemberForm) {

    // right before we submit our form to the server we check if the form is valid
    // if not, we pass the form to the validateform function again. Now with check dirty false
    // this means we check every form field independent of whether it's touched.

    if (this.addMemberForm.addEditMemberForm.valid) {

    const enteredData = this.addMemberForm.addEditMemberForm.value;

    this.httpService.addRecord(this.membersUrl, enteredData)
      .subscribe(
        res => {
          this.success();
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.handleError(err);
        }
      );
    } else {
      this.addMemberForm.formErrors = this.formErrorsService.validateForm(
        this.addMemberForm.addEditMemberForm,
        this.addMemberForm.formErrors, false
      );
    }
    addMemberForm.addEditMemberForm.reset();
  }

  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error addm1', 'Please check your Internet connection.');
  }

}


