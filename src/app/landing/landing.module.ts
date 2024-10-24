import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { FooterModule } from '../shared/components/footer/footer.module';
import { LoadingMaskModule } from '../shared/components/loading-mask/loading-mask.module';
import { HandlingGuestModule } from './handling-guest/handling-guest.module';
import { VideoUploadModule } from './shared/components/video-upload/video-upload.module';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    LoadingMaskModule,
    HandlingGuestModule,
    VideoUploadModule,
  ],
  exports: [LandingComponent],
})
export class LandingModule {}
