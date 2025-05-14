import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-advanced-statistics',
  imports: [NgFor],
  templateUrl: './advanced-statistics.component.html',
  styleUrl: './advanced-statistics.component.scss',
})
export class AdvancedStatisticsComponent {
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
}
