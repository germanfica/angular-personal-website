import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '@core/models/project';
import { map, Observable, } from 'rxjs';

const API_URL: string = `./assets/json/projects.json`;

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  /**
   * List of all projects.
   */
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${API_URL}`);
  }

  /**
   * Find a project by id.
   * @param id Identifier of the product to search.
   */
  getProject(id: number): Observable<Project> {
    return this.getAllProjects().pipe<Project>(map((projects: Project[]) => this.findProjectById(id, projects)));
  }

  /**
   * Find a project in a project list.
   * 
   * @param id project identifier.
   * @param projects project list.
   * @returns 
   */
  private findProjectById(id: number, projects: Project[]): Project {
    let i: number = projects.length - 1;
    let exit: boolean = false;
    let element: Project;
    let aux: Project = { id: -1 } as Project; // empty element by default

    while (i >= 0 && !exit) {
      element = projects[i];
      if (element.id === id) {
        console.log("Found it.");
        aux = projects[i];
        exit = true;
      }
      i--;
    }
    return aux;
  }
}