import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GotService {
  // Base URL for the Game of Thrones API
  private apiUrl = 'https://api.gameofthronesquotes.xyz/v1';

  constructor(private http: HttpClient) {}
  // Fetch all houses
  getAllHouses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/houses`);
  }
  // Fetch details of a specific house by slug
  getHouse(slug: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/house/${slug}`);
  }
  // Fetch all characters
  getCharacters() {
    return this.http.get<any[]>(`${this.apiUrl}/characters`);
  }
  // Fetch details of a specific character by slug
  getCharacterDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/character/${slug}`);
  }
  // Fetch 5 random quotes
  getQuotes() {
    return this.http.get<any[]>(`${this.apiUrl}/random/5`);
  }
}
