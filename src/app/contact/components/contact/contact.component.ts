import { Component, OnInit } from '@angular/core';
import { NavbarService } from '@app/layout/services/navbar.service';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { api } from 'src/environments/environment.api';

const BASE_URL: string = `${api.baseUrl}`;

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(
    private navbarService: NavbarService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Page title
    this.titleService.setTitle('Contact - German Fica');

    // Open Graph Meta Tags
    this.metaService.updateTag({ property: 'og:title', content: 'Contact - German Fica' });
    this.metaService.updateTag({ property: 'og:description', content: 'Get in touch with German Fica.' });
    this.metaService.updateTag({ property: 'og:url', content: `${BASE_URL}${this.router.url}` });
    this.metaService.updateTag({ property: 'og:site_name', content: 'German Fica' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_US' });

    // Twitter Card Meta Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary' });
    this.metaService.updateTag({ name: 'twitter:site', content: '@germanfica' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Contact - German Fica' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Get in touch with German Fica.' });
    this.metaService.updateTag({ name: 'twitter:creator', content: '@germanfica' });

    // Update navbar style
    this.navbarService.updateNavbarState({ isSticky: true, navbarStyle: 'colored' });
  }
}
