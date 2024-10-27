import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { LandingActions } from '../shared/store/actions';
import { GuestModel } from '../landing,model';
import { VideoUploadComponent } from '../shared/components/video-upload/video-upload.component';

@Component({
  selector: 'app-handling-guest',
  templateUrl: './handling-guest.component.html',
  styleUrls: ['./handling-guest.component.css'],
})
export class HandlingGuestComponent implements OnInit, OnDestroy {
  @ViewChild(VideoUploadComponent) videoUploadComponent!: VideoUploadComponent;
  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  public isloading$ = this.store.select(fromLanding.selecIsloading);

  public isMessage$ = this.store.select(fromLanding.selectIsMessage);

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

  getProcessedText = getProcessedText;
  public guestInfo: GuestModel = {} as GuestModel;

  loading = false;
  message: number = 0;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formGroupExtraGuest = new FormGroup({
      valueExtra: new FormControl('no', Validators.required),
      valueConfirmation: new FormControl('yes', Validators.required),
      guestNumberExtras: new FormControl(0, Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      video: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        console.log(state);
        this.guestInfo = state.guest ?? ({} as GuestModel);
        this.addressString = `${this.guestInfo.event_details.address_line1}, ${this.guestInfo.event_details.address_line2}, ${this.guestInfo.event_details.city}, ${this.guestInfo.event_details.state}, ${this.guestInfo.event_details.postal_code}, ${this.guestInfo.event_details.country}`;
        this.updateNumberOfExtras();
      });

    this.isMessage$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isMessage) => {
        if (isMessage === 1) {
          this.store.dispatch(
            LandingActions.updateGuestInformation({
              data: this.formGroupExtraGuest.value,
            })
          );
          //this.formGroupExtraGuest.reset();
        }
      });

    this.formGroupExtraGuest.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        if (value.valueExtra === 'yes') {
          this.isExtrasGuestVisible = true;
          this.numberOfExtras.forEach((extra, index) => {
            this.formGroupExtraGuest
              .get(`extraGuest${index}`)
              ?.setValidators(Validators.required);
            this.formGroupExtraGuest
              .get(`extraGuest${index}`)
              ?.updateValueAndValidity({ emitEvent: false });
          });
        } else {
          this.isExtrasGuestVisible = false;
          this.numberOfExtras.forEach((extra, index) => {
            this.formGroupExtraGuest
              .get(`extraGuest${index}`)
              ?.clearValidators();
            this.formGroupExtraGuest
              .get(`extraGuest${index}`)
              ?.updateValueAndValidity({ emitEvent: false });
          });
        }

        if (value.valueConfirmation === 'yes') {
          this.formGroupExtraGuest
            .get('valueExtra')
            ?.enable({ emitEvent: false });
        } else {
          this.formGroupExtraGuest
            .get('valueExtra')
            ?.disable({ emitEvent: false });
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateNumberOfExtras(): void {
    if (this.guestInfo.guest_extras) {
      this.numberOfExtras = Array.from(
        { length: this.guestInfo.guest_extras },
        (_, i) => ({
          name: `Extra ${i + 1}`,
          value: i + 1,
        })
      );

      // Add form controls for each extra guest without validators initially
      this.numberOfExtras.forEach((extra, index) => {
        this.formGroupExtraGuest.addControl(
          `extraGuest${index}`,
          new FormControl('')
        );
        this.formGroupExtraGuest.addControl(
          `extraGuestCheckbox${index}`,
          new FormControl(true)
        );
      });
    } else {
      this.numberOfExtras = [];
    }
  }

  onCheckboxChange(index: number): void {
    const checkboxControl = this.formGroupExtraGuest.get(
      `extraGuestCheckbox${index}`
    );
    const inputControl = this.formGroupExtraGuest.get(`extraGuest${index}`);

    if (checkboxControl?.value) {
      inputControl?.setValidators(Validators.required);
    } else {
      inputControl?.clearValidators();
    }
    inputControl?.updateValueAndValidity({ emitEvent: false });
  }

  onSubmit(): void {
    if (this.formGroupExtraGuest.valid) {
      // Handle form submission
      this.videoUploadComponent.uploadVideo();
      console.log(this.formGroupExtraGuest.value);
    } else {
      // Handle form errors
      console.log('Form is invalid');
      this.formGroupExtraGuest.markAllAsTouched();
    }
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

    this.store.dispatch(
      LandingActions.updateMessageFromVideo({
        isMessage: this.message,
      })
    );
  }
}
