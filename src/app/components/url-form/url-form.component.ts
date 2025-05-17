import { Component, ViewChild } from '@angular/core';
import { UrlShortenerService } from '../../services/url-shortener.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-url-form',
  imports: [FormsModule, NgIf],
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.scss',
})
export class UrlFormComponent {
  @ViewChild('urlInput') urlInput!: NgModel;

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
        this.longUrl = '';

        // Reset input validation state
        this.urlInput.control.markAsPristine();
        this.urlInput.control.markAsUntouched();

        this.loading = false;
      },

      error: (err) => {
        this.error = err.message;
        this.loading = false;
      },
    });
  }
}
