import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CelestialBody } from '../models/celestial-body';

@Injectable({
  providedIn: 'root'
})
export class AstronomyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/corposCelestes'; // Ajusta a URL da tua API

  getAll(): Observable<CelestialBody[]> {
    return this.http.get<CelestialBody[]>(this.apiUrl);
  }

  getById(id: string): Observable<CelestialBody> {
    return this.http.get<CelestialBody>(`${this.apiUrl}/${id}`);
  }

  create(body: CelestialBody): Observable<CelestialBody> {
    return this.http.post<CelestialBody>(this.apiUrl, body);
  }

  update(id: string, body: CelestialBody): Observable<CelestialBody> {
    return this.http.put<CelestialBody>(`${this.apiUrl}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}