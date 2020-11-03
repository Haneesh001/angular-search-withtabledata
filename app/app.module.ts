import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Jim's section:
import { MembersComponent } from "./members/members.component";
import { HttpService } from "./http.service";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "../server/in-memory-data.service";
import { FlexLayoutModule } from "@angular/flex-layout";

import { ConfirmService } from "./services/confirm-dialog/confirm.service";
import { ConfirmComponent } from "./services/confirm-dialog/confirm.component";
import { MessagesComponent } from "./services/messages-service/messages.component";
import { MessagesService } from "./services/messages-service/messages.service";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { EditMemberComponent } from "./members/edit-member/edit-member.component";
import { AddMemberComponent } from "./members/add-member/add-member.component";
import { AddEditFormComponent } from "./members/add-edit-form/add-edit-form.component";
import { UpdateDatatableService } from "./services/update-datatable.service";

import { FormErrorsService } from "./services/form-validation/form-errors.service";
import { ErrorMatcherService } from "./services/form-validation/form-validators.service";
import { ShowOnDirtyErrorStateMatcher } from "@angular/material";
import { UniqueNameService } from "./services/unique-name.service";

// Stackbliz
import { A11yModule } from "@angular/cdk/a11y";
import { BidiModule } from "@angular/cdk/bidi";
import { ObserversModule } from "@angular/cdk/observers";
import { OverlayModule } from "@angular/cdk/overlay";
import { PlatformModule } from "@angular/cdk/platform";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollDispatchModule } from "@angular/cdk/scrolling";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from "@angular/material";
import { AppComponent } from "./app.component";

/**
 * NgModule that includes all Material modules that are required to serve the app.
 */
@NgModule({
  exports: [
    // CDK
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    ScrollDispatchModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,

    // Material
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ]
})
export class MaterialModule {}

@NgModule({
  imports: [
    // Jim's
    FlexLayoutModule,

    // Stackbliz
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    MembersComponent,
    ConfirmComponent,
    MessagesComponent,
    EditMemberComponent,
    AddMemberComponent,
    AddEditFormComponent
  ],
  providers: [
    MembersComponent,
    HttpClientModule,
    HttpService,
    ConfirmService,
    MessagesService,
    FormErrorsService,
    UpdateDatatableService,
    UniqueNameService,
    { provide: ErrorMatcherService, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmComponent,
    MessagesComponent,
    EditMemberComponent,
    AddMemberComponent
  ]
})
export class AppModule {}

/**
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
