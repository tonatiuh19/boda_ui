import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Renderer2,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromLanding } from '../shared/store/selectors';
import { Subject, takeUntil, distinctUntilChanged } from 'rxjs';
import { getProcessedText } from '../../shared/utils/get-proccessed-text';
import {
  faMapMarkerAlt,
  faCheckCircle,
  faSuitcaseRolling,
  faTimes,
  faExternalLinkAlt,
  faArrowLeft,
  faGifts,
  faUserTie,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { LandingActions } from '../shared/store/actions';
import {
  EventAccommodationsModel,
  GiftsModel,
  GuestModel,
} from '../landing,model';
import { VideoUploadComponent } from '../shared/components/video-upload/video-upload.component';

@Component({
  selector: 'app-handling-guest',
  templateUrl: './handling-guest.component.html',
  styleUrls: ['./handling-guest.component.css'],
})
export class HandlingGuestComponent implements OnInit, OnDestroy {
  @ViewChild(VideoUploadComponent) videoUploadComponent!: VideoUploadComponent;
  public selectGuest$ = this.store.select(fromLanding.selectGuest);

  public isloading$ = this.store.select(fromLanding.selecIsloading);

  formGroupExtraGuest!: FormGroup;
  stateOptions: any[] = [
    { label: 'Si', value: 'yes' },
    { label: 'No', value: 'no' },
  ];
  public isExtrasGuestVisible = false;
  numberOfExtras: any[] = [];
  selectedExtras: number | undefined;

  addressString: string = '';
  faMapMarkerAlt = faMapMarkerAlt;
  faCheckCircle = faCheckCircle;
  faSuitcaseRolling = faSuitcaseRolling;
  faExternalLinkAlt = faExternalLinkAlt;
  faTimes = faTimes;
  faArrowLeft = faArrowLeft;
  faGifts = faGifts;
  faUserTie = faUserTie;
  faClock = faClock;

  getProcessedText = getProcessedText;
  public guestInfo: GuestModel = {} as GuestModel;

  loading = false;
  message: number = 0;

  public idUser!: number;

  isConfirmed = false;

  isConfirmation = false;

  isTitle = false;

  accomodationList: EventAccommodationsModel[] = [];
  accomodationPanelVisible: boolean = false;

  giftsPanelVisible: boolean = false;
  giftsList: GiftsModel[] = [];
  time: string = '';
  date: string = '';
  guestType: number = 0;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.formGroupExtraGuest = new FormGroup({
      valueConfirmation: new FormControl('yes', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      video: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.selectGuest$.pipe(takeUntil(this.unsubscribe$)).subscribe((guest) => {
      if (guest && typeof guest !== 'boolean') {
        this.guestInfo = guest;
        this.idUser = guest.id_guest;
        this.addressString = this.guestInfo.event_details.address_line1
          ? `${this.guestInfo.event_details.address_line1}, ${this.guestInfo.event_details.address_line2}, ${this.guestInfo.event_details.city}, ${this.guestInfo.event_details.state}, ${this.guestInfo.event_details.postal_code}, ${this.guestInfo.event_details.country}`
          : '';
        this.isTitle = this.guestInfo.title !== '';
        this.isConfirmation = this.guestInfo.confirmation === 1;
        this.time = this.formatTime(
          this.guestInfo.event_details.event_date.toString()
        );
        this.date = this.formatDate(
          this.guestInfo.event_details.event_date.toString()
        );
        this.guestType = this.guestInfo.guest_type;
        if (this.guestInfo.submited) {
          this.isConfirmed = true;
          this.accomodationList = this.guestInfo.accommodations ?? [];
          this.giftsList = this.guestInfo.gifts ?? [];
        } else {
          this.isConfirmed = false;
        }

        if (this.guestInfo.guest_extras.length > 0) {
          this.isExtrasGuestVisible = true;
        } else {
          this.isExtrasGuestVisible = false;
        }

        this.guestInfo.guest_extras.forEach((extra) => {
          this.formGroupExtraGuest.addControl(
            'extra_' + extra.id_guest_extra,
            this.fb.control(
              extra.confirmation === 0 ? 'yes' : 'no',
              Validators.required
            )
          );
        });

        if (this.isTitle) {
          this.formGroupExtraGuest.addControl(
            'extra_guest_' + this.guestInfo.id_guest,
            this.fb.control(
              this.guestInfo.confirmation === 0 ? 'yes' : 'no',
              Validators.required
            )
          );
        }
      } else {
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
    //this.store.dispatch(LandingActions.cleanGuest());
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  scrollToTop(): void {
    this.renderer.setProperty(document.documentElement, 'scrollTop', 0);
    this.renderer.setProperty(document.body, 'scrollTop', 0);
  }

  onSubmit(): void {
    if (this.formGroupExtraGuest.valid) {
      // Handle form submission
      if (this.guestType === 1) {
        this.videoUploadComponent.uploadVideo();
      }

      if (!this.isTitle) {
        this.store.dispatch(
          LandingActions.updateGuestInformation({
            data: {
              ...this.formGroupExtraGuest.value,
              id_guest: this.guestInfo.id_guest,
            },
          })
        );
      } else {
        const {
          valueConfirmation,
          ['extra_guest_' + this.guestInfo.id_guest]: _,
          ...formValueWithoutConfirmation
        } = this.formGroupExtraGuest.value;
        this.store.dispatch(
          LandingActions.updateGuestInformation({
            data: {
              ...formValueWithoutConfirmation,
              valueConfirmation: this.extractExtraGuestIds(
                this.formGroupExtraGuest.value
              ).value,
              id_guest: this.guestInfo.id_guest,
            },
          })
        );
      }
    } else {
      this.formGroupExtraGuest.markAllAsTouched();
    }
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} de ${month}, ${year}`;
  }

  extractExtraGuestIds(value: { [key: string]: any }): {
    id: number;
    value: any;
  } {
    return Object.keys(value)
      .filter((key) => key.startsWith('extra_guest_'))
      .map((key) => ({
        id: parseInt(key.split('_').pop() || '0', 10),
        value: value[key],
      }))[0];
  }

  onCancel(): void {
    this.store.dispatch(LandingActions.cleanGuest());
    this.router.navigate(['']);
  }

  onLocationLink(): void {
    window.open(this.guestInfo.event_details.google_link, '_blank');
  }

  onLoadingChange(loading: boolean) {
    this.loading = loading;
    if (this.loading) {
      this.store.dispatch(LandingActions.setLoading());
    } else {
      this.store.dispatch(LandingActions.cleanLoading());
    }
  }

  onMessageChange(message: number) {
    this.message = message;
  }

  onAccomodationPanelToggle() {
    this.accomodationPanelVisible = !this.accomodationPanelVisible;
  }

  onGiftsPanelToggle() {
    this.giftsPanelVisible = !this.giftsPanelVisible;
  }
}
