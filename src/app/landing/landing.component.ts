import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromLanding } from './shared/store/selectors';
import { Store } from '@ngrx/store';
import { LandingActions } from './shared/store/actions';
import { Subject, takeUntil } from 'rxjs';
import { LandingMediaModel } from './landing,model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  @ViewChild('discoverMore') discoverMore!: ElementRef;

  public selectMainImagesVideos$ = this.store.select(
    fromLanding.selectMainImagesVideos
  );
  public isloading$ = this.store.select(fromLanding.selecIsloading);
  isMobile: boolean = false;

  triggerModalGuest: boolean = false;

  public mainImagesVideos: LandingMediaModel = {} as LandingMediaModel;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.checkScreenSize();

    this.store.dispatch(
      LandingActions.getImagesVideosFromServer({
        mainDirectory: '../assets/videos/main-section',
        secondaryDirectory: '../assets/images/main',
      })
    );

    this.selectMainImagesVideos$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((mainImagesVideos) => {
        if (mainImagesVideos) {
          this.mainImagesVideos = mainImagesVideos;
        }
        console.log(this.mainImagesVideos);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 578; // Adjust the breakpoint as needed
  }

  scrollToDiscoverMore(): void {
    this.discoverMore.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  openModalGuest(): void {
    this.triggerModalGuest = true;
  }
}
