import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../environments/environment';
import 'rxjs/add/operator/catch'

const path = `${environment.baseUrl}/api`;

export interface Track {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getArtists() {
    return this.http
      .get(`${path}/artists`)
      .catch((err: HttpErrorResponse) => {
        throw(err.message);
    });
  }

  getTracks(artist: string, dir: string) {
    return this.http.get(`${path}/artists/${dir}/${artist}`);
  }

  getLast() {
    return this.http.get(`${path}/last`);
  }

}
