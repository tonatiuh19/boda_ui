import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../../landing,model';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  public GET_GUEST_BY_CODE_AND_EVENT_TYPE = `${DOMAIN}/getGuestByCodeAndEventType.php`;
  public UPDATE_GUEST_DETAILS = `${DOMAIN}/updateGuestDetails.php`;
  public GET_EVENT_ACCOMMODATIONS = `${DOMAIN}/getEventAccommodations.php`;
  public GET_MAIN_IMAGES = `https://garbrix.com/boda/api/getMainImages.php`;

  constructor(private httpClient: HttpClient) {}

  public getGuestByCodeAndEventType(guest_code: string): Observable<any> {
    return this.httpClient
      .post(this.GET_GUEST_BY_CODE_AND_EVENT_TYPE, {
        guest_code,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public updateGuestDetails(data: any): Observable<any> {
    //return of(1);
    return this.httpClient.post(this.UPDATE_GUEST_DETAILS, data).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getEventAccommodations(id_event: number): Observable<any> {
    return this.httpClient
      .post(this.GET_EVENT_ACCOMMODATIONS, {
        id_event,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public getMainImagesVideos(
    mainDirectory: string,
    secondaryDirectory: string
  ): Observable<any> {
    return this.httpClient
      .post(this.GET_MAIN_IMAGES, {
        mainDirectory,
        secondaryDirectory,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
