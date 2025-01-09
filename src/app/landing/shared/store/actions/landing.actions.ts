import { createAction, props } from '@ngrx/store';
import { EventAccommodationsModel, GuestModel } from '../../../landing,model';

const actor = '[Landing]';

export const getGuest = createAction(
  `${actor} Get Guest`,
  props<{ guest_code: string }>()
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
  props<{ guest: GuestModel }>()
);

export const updateGuestInformationFailure = createAction(
  `${actor} Update Guest Information Failure`,
  props<{ error: string }>()
);

export const getImagesVideosFromServer = createAction(
  `${actor} Get Images Videos From Server`,
  props<{ mainDirectory: string; secondaryDirectory: string }>()
);

export const getImagesVideosFromServerSuccess = createAction(
  `${actor} Get Images Videos From Server Success`,
  props<{ data: any }>()
);

export const getImagesVideosFromServerFailure = createAction(
  `${actor} Get Images Videos From Server Failure`,
  props<{ error: string }>()
);
