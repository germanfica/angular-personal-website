import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '@core/services/projects.service';
import { Project } from '@core/models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe(data => {
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
  }

  doSomething(projectId: number): void {
    console.log(`doSomething!!!!! ${projectId}`);
  }
}
