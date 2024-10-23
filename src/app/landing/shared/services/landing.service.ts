import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../../landing,model';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  public GET_GUEST_BY_CODE_AND_EVENT_TYPE = `${DOMAIN}/getGuestByCodeAndEventType.php`;

  constructor(private httpClient: HttpClient) {}

  public getGuestByCodeAndEventType(
    guest_code: string,
    event_type: number
  ): Observable<any> {
    return this.httpClient
      .post(this.GET_GUEST_BY_CODE_AND_EVENT_TYPE, {
        guest_code,
        event_type,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
