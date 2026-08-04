import { createAction, props } from '@ngrx/store';
import {
  EventAccommodationsModel,
  GuestFullModel,
  GuestModel,
  WeddingPlannerModel,
} from '../../../landing,model';

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

export const getAllGuests = createAction(`${actor} Get All Guests`);

export const getAllGuestsSuccess = createAction(
  `${actor} Get All Guests Success`,
  props<{ guests: GuestFullModel[] }>()
);

export const getAllGuestsFailure = createAction(
  `${actor} Get All Guests Failure`,
  props<{ error: string }>()
);

export const validateWeddingPlanner = createAction(
  `${actor} Validate Wedding Planner`,
  props<{ code: string }>()
);

export const validateWeddingPlannerSuccess = createAction(
  `${actor} Validate Wedding Planner Success`,
  props<{ response: WeddingPlannerModel | boolean }>()
);

export const validateWeddingPlannerFailure = createAction(
  `${actor} Validate Wedding Planner Failure`,
  props<{ error: string }>()
);

export const resetWeddingPlanner = createAction(
  `${actor} Reset Wedding Planner`
);

export const checkSession = createAction(
  `${actor} Check Session`,
  props<{ date: string; id_guest: number }>()
);

export const checkSessionSuccess = createAction(
  `${actor} Check Session Success`,
  props<{ resp: boolean }>()
);

export const checkSessionFailure = createAction(
  `${actor} Check Session Failure`,
  props<{ error: string }>()
);
