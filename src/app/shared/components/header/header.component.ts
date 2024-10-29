import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { fromLanding } from '../../../landing/shared/store/selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingActions } from '../../../landing/shared/store/actions';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  @ViewChild('formRef') formRef: any;

  @Input() isMain = true;

  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );
  public isModalGuestVisible = false;

  public isError: boolean = false;

  formGetGuest!: FormGroup;
  public messages: Message[] = [];

  public events = [
    { label: 'Despedida de Soltero', value: 1 },
    { label: 'Despedida de Soltera', value: 2 },
    { label: 'Despedida Mixta', value: 3 },
    { label: 'Boda Civil', value: 4 },
    { label: 'Boda Religiosa', value: 5 },
  ];

  guestCode: string = '';

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formGetGuest = this.fb.group({
      guestCode: ['', Validators.required],
      guestPlace: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        console.log(state);
        if (!state.guest || Object.keys(state.guest).length === 0) {
          if (state.isValidated) {
            this.isError = true;
          }
          this.formGetGuest.reset();
        } else {
          this.isError = false;
          this.isModalGuestVisible = false;
          this.formGetGuest.reset();
          this.router.navigate(['soyinvitado']);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showGuestModal() {
    this.isModalGuestVisible = true;
  }

  onSubmitGuestForm(): void {
    if (this.formGetGuest.valid) {
      // Handle form submission
      console.log(this.formGetGuest.value);
      this.store.dispatch(
        LandingActions.getGuest({
          guest_code: this.formGetGuest.value.guestCode,
          event_type: this.formGetGuest.value.guestPlace,
        })
      );
    } else {
      this.formGetGuest.markAllAsTouched();
      // Handle form errors
      console.log('Form is invalid');
    }
  }

  submitGuestForm(): void {
    if (this.formRef) {
      this.formRef.ngSubmit.emit();
    }
  }

  showError() {
    this.messages = [
      {
        severity: 'warn',
        summary: 'Tu código no es válido, o no has sido invitado a este evento',
      },
    ];
  }

  clearError() {
    this.messages = [];
  }

  transformToUppercase() {
    this.guestCode = this.guestCode.toUpperCase();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');

    const targetElement = document.getElementById('target-element');

    if (this.isMain) {
      if (navbar && targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top;
        const navbarHeight = navbar.offsetHeight;

        if (targetPosition <= navbarHeight) {
          navbar.classList.add('bg-light');
        } else {
          navbar.classList.remove('bg-light');
        }
      }
    } else {
      navbar ? navbar.classList.add('bg-light') : null;
    }
  }
}
