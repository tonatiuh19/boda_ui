import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-gallery-carousel',
  templateUrl: './gallery-carousel.component.html',
  styleUrls: ['./gallery-carousel.component.css'],
})
export class GalleryCarouselComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() images: { name: string; path: string }[] = [];
  @ViewChild('carouselTrack') carouselTrack!: ElementRef;
  currentIndex: number = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.startCarousel();
  }

  ngAfterViewInit(): void {
    this.updateCarousel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }

  nextImage(): void {
    this.currentIndex =
      (this.currentIndex + 1) % Math.ceil(this.images.length / 3);
    this.updateCarousel();
  }

  previousImage(): void {
    this.currentIndex =
      (this.currentIndex - 1 + Math.ceil(this.images.length / 3)) %
      Math.ceil(this.images.length / 3);
    this.updateCarousel();
  }

  updateCarousel(): void {
    if (this.carouselTrack) {
      const track = this.carouselTrack.nativeElement as HTMLElement;
      const slideWidth =
        track.querySelector('.carousel-slide')?.clientWidth || 0;
      track.style.transform = `translateX(-${
        this.currentIndex * slideWidth * 3
      }px)`; // Move by 3 slides at a time
    }
  }
}
