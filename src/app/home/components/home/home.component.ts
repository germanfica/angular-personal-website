import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavbarService } from '@app/layout/services/navbar.service';
import { UrlService } from '@core/services/url.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private navbarService: NavbarService,
    private titleService: Title,
    private metaService: Meta,
    private urlService: UrlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('German Fica');

    // Open Graph Meta Tags
    this.metaService.updateTag({ property: 'og:title', content: 'German Fica' });
    this.metaService.updateTag({ property: 'og:description', content: 'Software Developer | Web Developer | Unity Developer' });
    this.metaService.updateTag({ property: 'og:image', content: `${this.urlService.getBaseUrl()}/assets/images/home_preview_thumbnail.png` });
    this.metaService.updateTag({ property: 'og:url', content: this.urlService.getBaseUrl() + this.router.url });
    this.metaService.updateTag({ property: 'og:site_name', content: 'German Fica' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_US' });

    // Twitter Card Meta Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'Software Developer | Web Developer | Unity Developer' });
    this.metaService.updateTag({ name: 'twitter:site', content: '@germanfica' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'German Fica' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Software Developer | Web Developer | Unity Developer' });
    this.metaService.updateTag({ name: 'twitter:image', content: `${this.urlService.getBaseUrl()}/assets/images/home_preview_thumbnail.png` });
    this.metaService.updateTag({ name: 'twitter:creator', content: '@germanfica' });

    // Update navbar style
    this.navbarService.updateNavbarState({ isSticky: false, navbarStyle: 'transparent' });
  }

}
