import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavbarService } from '@app/layout/services/navbar.service';
import { PageNotFoundService } from './page-not-found.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router,
    private navbarService: NavbarService,
    private titleService: Title,
    private metaService: Meta,
    private pageNotFoundService: PageNotFoundService
  ) {
    this.pageNotFoundService.setNotFoundStatusCode();
  }

  ngOnInit(): void {
    this.titleService.setTitle('404 not found');

    // Clean existing metatags
    this.clearMetaTags();

    // Ignore
    this.metaService.updateTag({ name: 'robots', content: 'noindex' });
    // Update navbar style
    this.navbarService.updateNavbarState({ isSticky: false, navbarStyle: 'colored-pos-abs' });
  }

  back(): void {
    this.router.navigate(['/']);
  }

  private clearMetaTags(): void {
    // Eliminar metaetiquetas de Open Graph
    this.metaService.removeTag("property='og:title'");
    this.metaService.removeTag("property='og:description'");
    this.metaService.removeTag("property='og:image'");
    this.metaService.removeTag("property='og:image:secure_url'");
    this.metaService.removeTag("property='og:url'");
    this.metaService.removeTag("property='og:site_name'");
    this.metaService.removeTag("property='og:type'");
    this.metaService.removeTag("property='og:locale'");

    // Eliminar metaetiquetas de Twitter Card
    this.metaService.removeTag("name='twitter:card'");
    this.metaService.removeTag("name='twitter:site'");
    this.metaService.removeTag("name='twitter:title'");
    this.metaService.removeTag("name='twitter:description'");
    this.metaService.removeTag("name='twitter:image'");
    this.metaService.removeTag("name='twitter:creator'");
  }
}
