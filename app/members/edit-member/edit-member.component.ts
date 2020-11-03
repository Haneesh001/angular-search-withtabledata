



//  Child components process their own data, not the main-processor service.

import { Component, AfterViewInit, Inject, ViewChild, ViewEncapsulation } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { HttpService } from '../../http.service';
import { MemberModel } from '../member.model';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';
import { UpdateDatatableService } from '../../services/update-datatable.service';

import { MessagesService } from '../../services/messages-service/messages.service';
import { FormErrorsService } from '../../services/form-validation/form-errors.service';



@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  encapsulation: ViewEncapsulation.None
})


export class EditMemberComponent implements AfterViewInit {

  private membersUrl = 'api/members';
  private formValue: MemberModel;

  private recordId: number;
  private idColumn;
  private paginator;
  private dataSource;


  // This is a form group from FormBuilder.
  @ViewChild(AddEditFormComponent) 
  private addEditForm: AddEditFormComponent;



  constructor(
    private httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // Used in modal for close()
    public dialogRef: MatDialogRef<EditMemberComponent>,        
    private updateDatatableService: UpdateDatatableService,
    private messagesService: MessagesService,
    public formErrorsService: FormErrorsService,
  ) {}



  // ---- GET DATA BY ID ----


// Need to load the data after the form is rendered so ngOnInit didn't work.
// setTimeout is a hack to avoid ExpressionChangedAfterItHasBeenCheckedError

  ngAfterViewInit() {
    setTimeout(() => {
      this.fetchRecord();
    }, 200);
  }

  public fetchRecord() {

    this.recordId = this.data.recordId;
    this.idColumn = this.data.idColumn;
    this.paginator = this.data.paginator;
    this.dataSource = this.data.dataSource;

    // Display the data retrieved from the data model to the form model.
    this.httpService.getRecordById(this.membersUrl, this.recordId)
        .subscribe(data => {
            this.fillForm(data);
          },
          (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.message);
            this.handleError(err);
          });
  }



  // Populate the form, called above in fetchRecord().

  private fillForm(parsedData) {
    this.addEditForm.addEditMemberForm.setValue({
      id: parsedData.id,
      first_name: parsedData.first_name,
      last_name: parsedData.last_name,
      user_name: parsedData.user_name,
      country: parsedData.country,
    });
    this.existingUserName(); // If existing name, don't validate.
  }



// ---- UPDATE ----  Called from edit-member.component.html

  public update(formValue) {
    if (this.addEditForm.addEditMemberForm.valid) {
      this.httpService.updateRecord(this.membersUrl, formValue)
      .subscribe(
        result => {
          // Update the table data view for the changes.
          this.updateDatatableService.updateDataTable(
            result, this.recordId, this.idColumn, this.paginator, this.dataSource, formValue);
          this.success();
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          console.log(err.message);
          this.handleError(err);
        }
      );
    }
  }

  // Check if the user_name field has a name already and set
  //   the unique user name validation field to false so
  //   it doesn't trigger validation until changed.

  private existingUserName() {
    if (this.addEditForm.addEditMemberForm.controls['user_name']
        .value !== null) {
      this.addEditForm.inDatabase = false;
    } else {
      return null;
    }
  }


  // ---- UTILITIES ----


  private reset() {
    this.addEditForm.addEditMemberForm.reset();
  }

  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error em1', 'Please check your Internet connection.');
  }
}



