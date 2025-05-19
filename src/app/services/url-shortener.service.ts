import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface ShortenedUrl {
  longUrl: string;
  shortUrl: string;
}

interface TinyUrlResponse {
  data: {
    tiny_url: string; // The shortened URL field from TinyURL API
  };
}

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  private apiToken = environment.tinyUrlApiKey;
  private apiUrl = 'https://api.tinyurl.com/create';
  private localStorageKey = 'shortenedUrls';

  constructor(private http: HttpClient) {
    console.log(this.apiToken);
  }

  shortenUrl(longUrl: string): Observable<string> {
    const trimmed = longUrl.trim();

    if (!/^https?:\/\//.test(trimmed)) {
      return throwError(
        () => new Error('URL must start with http:// or https://')
      );
    }

    const body = {
      url: trimmed,
      domain: 'tinyurl.com',
    };

    return this.http
      .post<TinyUrlResponse>(this.apiUrl, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiToken}`, // if your token is required
        },
      })
      .pipe(
        map((res) => res.data.tiny_url),
        tap((shortUrl) =>
          this.saveToLocalStorage({ longUrl: trimmed, shortUrl })
        ),
        catchError(() =>
          throwError(() => new Error('Failed to shorten the URL'))
        )
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
