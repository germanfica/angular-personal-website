import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '@core/services/projects.service';
import { Project } from '@core/models/project';
import { NavbarService } from '@app/layout/services/navbar.service';
import { Subscription } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { api } from 'src/environments/environment.api';

const BASE_URL: string = `${api.baseUrl}`;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription(); // Matener un registro de las suscripciones
  projects: Project[] = [];

  constructor(
    private projectsService: ProjectsService,
    private navbarService: NavbarService,
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Projects - German Fica');

    // Open Graph Meta Tags
    this.metaService.updateTag({ property: 'og:title', content: 'Projects - German Fica' });
    this.metaService.updateTag({ property: 'og:description', content: 'See all my thinking process' });
    //this.metaService.updateTag({ property: 'og:image', content: 'Preview image URL' });
    //this.metaService.updateTag({ property: 'og:image:secure_url', content: 'Preview image URL' });
    this.metaService.updateTag({ property: 'og:url', content: `${BASE_URL}/${this.router.url}` });
    this.metaService.updateTag({ property: 'og:site_name', content: 'German Fica' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:locale', content: 'en_US' });

    // Twitter Card Meta Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'See all my thinking process' });
    this.metaService.updateTag({ name: 'twitter:site', content: '@germanfica' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'Projects - German Fica' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'See all my thinking process' });
    //this.metaService.updateTag({ name: 'twitter:image', content: 'Preview image URL' });
    this.metaService.updateTag({ name: 'twitter:creator', content: '@germanfica' });

    // Update navbar style
    this.navbarService.updateNavbarState({ isSticky: true, navbarStyle: 'colored' });

    // Fetch projects
    this.fetchProjects();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // Desuscribe todas las suscripciones
  }

  doSomething(projectId: number): void {
    console.log(`doSomething!!!!! ${projectId}`);
  }

  private fetchProjects() {
    const projServSub = this.projectsService.getAllProjects().subscribe(data => {
      this.projects = data;

      console.table(this.projects);
      //let idd = this.projects[0].id;
      if (this.projects && this.projects.length > 0) {
        let idd = this.projects[0].id;
      } else {
        console.log('No projects or empty projects array');
        console.log(`Size ${this.projects.length}`)
      }

      console.log('Tipo de data:', typeof data);

      let hola: Project = {} as Project;

      console.log('Tipo de data:', typeof this.projects);
      console.log('Tipo de data:', typeof hola);
    });
    this.subscription.add(projServSub);
  }
}
