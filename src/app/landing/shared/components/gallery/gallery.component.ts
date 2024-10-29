import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DataImagesVideosModel } from '../../../landing,model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  @Input() images: DataImagesVideosModel[] = [];
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  selectedImage: DataImagesVideosModel | null = null;

  openModal(image: DataImagesVideosModel) {
    this.selectedImage = image;
  }

  closeModal() {
    this.selectedImage = null;
  }
}
