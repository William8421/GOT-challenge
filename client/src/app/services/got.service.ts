import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GotService {
  private apiUrl = 'https://api.gameofthronesquotes.xyz/v1';

  constructor(private http: HttpClient) {}

  getAllHouses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/houses`);
  }

  getHouse(slug: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/house/${slug}`);
  }

  getCharacters() {
    return this.http.get<any[]>(`${this.apiUrl}/characters`);
  }

  getCharacterDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/${slug}`);
  }

  getQuotes() {
    return this.http.get<any[]>(`${this.apiUrl}/random/5`);
  }
}
