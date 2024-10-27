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

export const setLoading = createAction(`${actor} Set Loading`);

export const cleanLoading = createAction(`${actor} Clean Loading`);

export const updateMessageFromVideo = createAction(
  `${actor} Update Message From Video`,
  props<{ isMessage: number }>()
);

export const updateGuestInformation = createAction(
  `${actor} Update Guest Information`,
  props<{ data: any }>()
);

export const updateGuestInformationSuccess = createAction(
  `${actor} Update Guest Information Success`,
  props<{ isConfirmed: number }>()
);

export const updateGuestInformationFailure = createAction(
  `${actor} Update Guest Information Failure`,
  props<{ error: string }>()
);
