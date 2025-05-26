import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UrlShortenerService } from '../../services/url-shortener.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-url-form',
  imports: [FormsModule, NgIf],
  templateUrl: './url-form.component.html',
  styleUrl: './url-form.component.scss',
})
export class UrlFormComponent implements OnInit, OnDestroy {
  @ViewChild('urlInput') urlInput!: NgModel;

  longUrl = '';
  shortUrl: string | null = null;
  error: string | null = null;
  loading = false;
  isOnline = true;

  constructor(private urlShortenerService: UrlShortenerService) {}

  async ngOnInit() {
    const status = await Network.getStatus();
    this.isOnline = status.connected;

    Network.addListener('networkStatusChange', (status) => {
      this.isOnline = status.connected;
    });
  }

  ngOnDestroy(): void {
    Network.removeAllListeners();
  }

  shortenUrl() {
    if (!this.isOnline) {
      alert('No internet connection.');
      return;
    }

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
