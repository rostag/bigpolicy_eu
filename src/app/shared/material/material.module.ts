import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatSnackBarModule, MatDialogModule, MatIconModule, MatCardModule, MatFormFieldModule,
  MatToolbarModule, MatButtonModule, MatMenuModule, MatSelectModule, MatProgressBarModule,
  MatListModule, MatTabsModule, MatProgressSpinnerModule, MatInputModule, MatAutocompleteModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  exports: [
    // components we want to make available
    CommonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  declarations: [
  ],
  providers: [
  ],
  entryComponents: []
})

export class MaterialModule {
}
