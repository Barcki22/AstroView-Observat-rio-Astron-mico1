import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CelestialBody } from '../models/celestial-body';

type FirebaseCelestialBody = Omit<CelestialBody, 'id'> & { id?: unknown };

@Injectable({
  providedIn: 'root',
})
export class AstronomyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://astroview-5ee66-default-rtdb.firebaseio.com/';
  private sufix = '.json';

  getAll(): Observable<CelestialBody[]> {
    return this.http
      .get<Record<string, FirebaseCelestialBody> | null>(`${this.apiUrl}${this.sufix}`)
      .pipe(
        map((response) => {
          if (!response) {
            return [];
          }
          return Object.entries(response).map(([id, conteudo]) => {
            const { id: _ignoredId, ...data } = conteudo;
            return { id, ...data } as CelestialBody;
          });
        })
      );
  }

  getById(id: string): Observable<CelestialBody> {
    return this.http
      .get<FirebaseCelestialBody | null>(`${this.apiUrl}${id}${this.sufix}`)
      .pipe(
        map((response) => {
          if (!response) {
            throw new Error('Conteúdo não encontrado');
          }

          const { id: _ignoredId, ...data } = response;
          return { id, ...data } as CelestialBody;
        })
      );
  }

  create(conteudo: Omit<CelestialBody, 'id'>): Observable<CelestialBody> {
    return this.http
      .post<{ name: string }>(`${this.apiUrl}${this.sufix}`, conteudo)
      .pipe(
        map((response) => ({
          id: response.name,
          ...conteudo,
        }))
      );
  }
}