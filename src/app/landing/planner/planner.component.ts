import { Component, OnInit, OnDestroy } from '@angular/core';
import { GuestFullModel, WeddingPlannerModel } from '../landing,model';
import { fromLanding } from '../shared/store/selectors';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { LandingActions } from '../shared/store/actions';
import { getProcessedText } from '../../shared/utils/get-proccessed-text';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { faBaby } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css'],
})
export class PlannerComponent implements OnInit, OnDestroy {
  public selectGuests$ = this.store.select(fromLanding.selectGuests);
  public selectWeddingPlanner$ = this.store.select(
    fromLanding.selectWeddingPlanner
  );

  guests: GuestFullModel[] = [];

  faBaby = faBaby;

  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 1;
  paginatedGuests: GuestFullModel[] = [];
  parentGuests: GuestFullModel[] = [];

  weddingPlanner!: WeddingPlannerModel;

  validationForm!: FormGroup;

  getProcessedText = getProcessedText;

  isPlannerValid: boolean = false;

  isLoading: boolean = false;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store, private fb: FormBuilder) {
    this.validationForm = this.fb.group({
      validationCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.selectGuests$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((guests) => {
        console.log('Guests', guests);
        this.isLoading = false;
        this.guests = guests || [];
        this.parentGuests = this.guests.filter(
          (guest) => !guest.id_guest_parent
        );
        this.totalPages = Math.ceil(
          this.parentGuests.length / this.itemsPerPage
        );
        this.updatePaginatedGuests();
      });

    this.selectWeddingPlanner$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((planner) => {
        if (planner) {
          this.isLoading = true;
          this.store.dispatch(LandingActions.getAllGuests());
          this.weddingPlanner = planner;
        }
        this.isPlannerValid = !!planner;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updatePaginatedGuests(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedGuests = this.parentGuests.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedGuests();
    }
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  getSubGuests(parentId: number): GuestFullModel[] {
    return this.guests.filter(
      (guest) =>
        guest.id_guest_parent === parentId || guest.id_guest === parentId
    );
  }

  checkIn(guest: GuestFullModel): void {
    console.log(`Check-in for ${guest.full_name}`);
    // Implement check-in logic here
  }

  validateCode(): void {
    if (this.validationForm.valid) {
      this.isLoading = true;
      console.log('Validating code');
      this.store.dispatch(
        LandingActions.validateWeddingPlanner({
          code: this.validationForm.value.validationCode,
        })
      );
      this.isLoading = false;
    }
  }

  sixDigitValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValid = /^\d{6}$/.test(value);
    return isValid ? null : { sixDigit: true };
  }

  logout(): void {
    console.log('Cerrar Sesión');
    // Implement logout logic here
    this.store.dispatch(LandingActions.resetWeddingPlanner());
  }
}
