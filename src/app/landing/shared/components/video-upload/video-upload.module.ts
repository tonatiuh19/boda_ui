import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoUploadComponent } from './video-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [VideoUploadComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [VideoUploadComponent],
})
export class VideoUploadModule {}
