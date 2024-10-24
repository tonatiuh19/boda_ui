import { createAction, props } from '@ngrx/store';
import { GuestModel } from '../../../landing,model';

const actor = '[Landing]';

export const getGuest = createAction(
  `${actor} Get Guest`,
  props<{ guest_code: string; event_type: number }>()
);

export const getGuestSuccess = createAction(
  `${actor} Get Guest Success`,
  props<{ guest: GuestModel }>()
);

export const getGuestFailure = createAction(
  `${actor} Get Guest Failure`,
  props<{ error: string }>()
);

export const cleanGuest = createAction(`${actor} Clean Guest`);
