import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { UrlFormComponent } from '../../components/url-form/url-form.component';
import { AdvancedStatisticsComponent } from '../../components/advanced-statistics/advanced-statistics.component';
import { CtaComponent } from '../../components/cta/cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    UrlFormComponent,
    AdvancedStatisticsComponent,
    CtaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
