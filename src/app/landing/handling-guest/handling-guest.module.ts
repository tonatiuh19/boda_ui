import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandlingGuestComponent } from './handling-guest.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VideoUploadModule } from '../shared/components/video-upload/video-upload.module';

@NgModule({
  declarations: [HandlingGuestComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectButtonModule,
    FormsModule,
    DropdownModule,
    FontAwesomeModule,
    VideoUploadModule,
  ],
  exports: [HandlingGuestComponent],
})
export class HandlingGuestModule {}
