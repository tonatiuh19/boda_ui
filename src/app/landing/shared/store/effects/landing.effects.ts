import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { LandingActions } from '../actions';
import { LandingService } from '../../services/landing.service';
import { fromLanding } from '../selectors';
import { GuestModel } from '../../../landing,model';

@Injectable()
export class LandingEffects {
  paying$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getGuest),
      switchMap(({ guest_code }) => {
        return this.landingService.getGuestByCodeAndEventType(guest_code).pipe(
          map((response: GuestModel) => {
            return LandingActions.getGuestSuccess({
              guest: response,
            });
          }),
          catchError((error) => {
            return of(LandingActions.getGuestFailure({ error: error }));
          })
        );
      })
    );
  });

  updateGuestInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.updateGuestInformation),
      switchMap(({ data }) => {
        return this.landingService.updateGuestDetails(data).pipe(
          map((response) => {
            return LandingActions.updateGuestInformationSuccess({
              guest: response,
            });
          }),
          catchError((error) => {
            return of(LandingActions.updateGuestInformationFailure({ error }));
          })
        );
      })
    );
  });

  getImagesVideosFromServer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getImagesVideosFromServer),
      switchMap(({ mainDirectory, secondaryDirectory }) => {
        return this.landingService
          .getMainImagesVideos(mainDirectory, secondaryDirectory)
          .pipe(
            map((response) => {
              return LandingActions.getImagesVideosFromServerSuccess({
                data: response,
              });
            }),
            catchError((error) => {
              return of(
                LandingActions.getImagesVideosFromServerFailure({ error })
              );
            })
          );
      })
    );
  });

  getAllGuests$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.getAllGuests),
      switchMap(({}) => {
        return this.landingService.getAllGuests().pipe(
          map((response) => {
            return LandingActions.getAllGuestsSuccess({
              guests: response,
            });
          }),
          catchError((error) => {
            return of(LandingActions.getAllGuestsFailure({ error }));
          })
        );
      })
    );
  });

  validateWeddingPlanner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.validateWeddingPlanner),
      switchMap(({ code }) => {
        return this.landingService.validateWeddingPlanner(code).pipe(
          map((response) => {
            return LandingActions.validateWeddingPlannerSuccess({
              response,
            });
          }),
          catchError((error) => {
            return of(LandingActions.validateWeddingPlannerFailure({ error }));
          })
        );
      })
    );
  });

  checkSession$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LandingActions.checkSession),
      switchMap(({ date, id_guest }) => {
        return this.landingService.checkSession(date, id_guest).pipe(
          map((response) => {
            return LandingActions.checkSessionSuccess({ resp: response });
          }),
          catchError((error) => {
            return of(LandingActions.checkSessionFailure({ error }));
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private store: Store,
    private landingService: LandingService
  ) {}
}
