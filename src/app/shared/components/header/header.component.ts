import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @ViewChild('modalGuestButton')
  modalGuestButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('closeButtonModal')
  closeButtonModal!: ElementRef<HTMLButtonElement>;
  @ViewChild('formRef') formRef: any;

  @Input() triggerModal: boolean = false;
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

  guestCode: string = ''; // Initialize guestCode properly

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formGetGuest = this.fb.group({
      guestCode: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        if (state.guest.id_guest === 0) {
          if (state.isValidated) {
            this.isError = true;
          }
          this.formGetGuest.reset();
        } else {
          this.closeModal();
          this.isError = false;
          this.isModalGuestVisible = false;
          this.formGetGuest.reset();
          this.router.navigate(['soyinvitado']);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerModal'] && changes['triggerModal'].currentValue) {
      this.openModal();
    }
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
      this.store.dispatch(
        LandingActions.getGuest({
          guest_code: this.formGetGuest.value.guestCode,
        })
      );
    } else {
      this.formGetGuest.markAllAsTouched();
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
    if (this.guestCode) {
      this.guestCode = this.guestCode.toUpperCase();
    }
  }

  openModal(): void {
    this.modalGuestButton.nativeElement.click();
  }

  closeModal(): void {
    this.closeButtonModal.nativeElement.click();
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
          //navbar.classList.add('bg-light');
        } else {
          //navbar.classList.remove('bg-light');
        }
      }
    } else {
      //navbar ? navbar.classList.add('bg-light') : null;
    }
  }
}
