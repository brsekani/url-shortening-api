import { Component } from '@angular/core';
import { UrlShortenerService } from '../../services/url-shortener.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-url-form',
  imports: [FormsModule, NgIf],
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.scss',
})
export class UrlFormComponent {
  longUrl = '';
  shortUrl: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(private urlShortenerService: UrlShortenerService) {}

  shortenUrl() {
    this.shortUrl = null;
    this.error = null;
    this.loading = true;

    this.urlShortenerService.shortenUrl(this.longUrl).subscribe({
      next: (url) => {
        this.shortUrl = url;
        this.loading = false;
      },

      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}
