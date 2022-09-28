// MaterialModule.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

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
        // components to use in this module
    ],
    providers: [
        // singleton services
    ],
    entryComponents: [
    ]
})

export class MaterialModule { }
