import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface ShortenedUrl {
  longUrl: string;
  shortUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  private apiUrl = '/api/shorten';
  private localStorageKey = 'shortenedUrls';

  constructor(private http: HttpClient) {}

  shortenUrl(longUrl: string): Observable<string> {
    const trimmed = longUrl.trim();

    if (!/^https?:\/\//.test(trimmed)) {
      return throwError(
        () => new Error('URL must start with http:// or https://')
      );
    }

    const body = new HttpParams().set('url', trimmed);

    return this.http.post<any>(this.apiUrl, body).pipe(
      map((res) => res.result_url),
      tap((shortUrl) =>
        this.saveToLocalStorage({ longUrl: trimmed, shortUrl })
      ),
      catchError(() => throwError(() => new Error('Failed to shorten the URL')))
    );
  }

  private saveToLocalStorage(item: ShortenedUrl): void {
    const existing: ShortenedUrl[] = JSON.parse(
      localStorage.getItem(this.localStorageKey) || '[]'
    );

    const updated = [
      item,
      ...existing.filter((i) => i.longUrl !== item.longUrl),
    ];

    if (updated.length > 3) {
      updated.length = 3;
    }

    localStorage.setItem(this.localStorageKey, JSON.stringify(updated));
  }

  getTopShortenedUrls(): ShortenedUrl[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }
}
