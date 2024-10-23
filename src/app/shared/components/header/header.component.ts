import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { fromLanding } from '../../../landing/shared/store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );
  public isModalGuestVisible = false;

  public events = [
    { label: 'Despedida de Soltero', value: 1 },
    { label: 'Despedida de Soltera', value: 2 },
    { label: 'Despedida Mixta', value: 3 },
    { label: 'Boda Civil', value: 4 },
    { label: 'Boda Religiosa', value: 5 },
  ];

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        console.log(state);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showGuestModal() {
    this.isModalGuestVisible = true;
  }
}
