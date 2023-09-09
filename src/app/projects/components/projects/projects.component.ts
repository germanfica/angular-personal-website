import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '@core/services/projects.service';
import { Project } from '@core/models/project';
import { NavbarService } from '@app/layout/services/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription(); // Matener un registro de las suscripciones
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.updateNavbarState({ isSticky: true, navbarStyle: 'colored' });
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // Desuscribe todas las suscripciones
  }

  doSomething(projectId: number): void {
    console.log(`doSomething!!!!! ${projectId}`);
  }
}
