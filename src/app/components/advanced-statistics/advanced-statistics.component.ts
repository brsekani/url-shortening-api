import { Component } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { UrlShortenerService } from '../../services/url-shortener.service';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-advanced-statistics',
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './advanced-statistics.component.html',
  styleUrl: './advanced-statistics.component.scss',
})
export class AdvancedStatisticsComponent {
  copiedUrl: string | null = null;

  advancedStatisticsData = [
    {
      title: 'Brand Recognition',
      details:
        "Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.",
      icon: '/svgs/icon-brand-recognition.svg',
    },
    {
      title: 'Detailed Records',
      details:
        'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps you make better decisions.',
      icon: '/svgs/icon-detailed-records.svg',
    },
    {
      title: 'Fully Customizable',
      details:
        'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
      icon: '/svgs/icon-fully-customizable.svg',
    },
  ];

  constructor(private urlShortenerService: UrlShortenerService) {}

  get history() {
    console.log(this.urlShortenerService.getTopShortenedUrls());
    return this.urlShortenerService.getTopShortenedUrls();
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(async () => {
      this.copiedUrl = text;
      await Haptics.impact({ style: ImpactStyle.Medium });
      setTimeout(() => (this.copiedUrl = null), 2000);
    });
  }

  async shareApp(text: string) {
    await Haptics.impact({ style: ImpactStyle.Medium });

    await Share.share({
      title: 'Check this out!',
      text: text,
      url: text,
      dialogTitle: 'Share with friends',
    });
  }
}
