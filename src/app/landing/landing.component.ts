import { Component, OnInit } from '@angular/core';
import { fromLanding } from './shared/store/selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  public isloading$ = this.store.select(fromLanding.selecIsloading);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
