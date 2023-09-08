import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '@core/services/projects.service';
import { Project } from '@core/models/project';

@Component({
  selector: 'app-latest-projects',
  templateUrl: './latest-projects.component.html',
  styleUrls: ['./latest-projects.component.scss']
})
export class LatestProjectsComponent implements OnInit {
  latestProjects: Project[] = [];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.fetchAndSetLatestProjects();
  }

  /**
   * Fetch all projects, sort them by date, and set the latest three
   */
  private fetchAndSetLatestProjects(): void {
    this.projectsService.getAllProjects().subscribe(projects => {
      this.latestProjects = this.getLatestProjects(projects);
    });
  }

  /**
   * Sorts the array of projects by date in descending order
   * and returns the latest three.
   * 
   * @param projects Array of Project objects
   * @returns Array containing the three most recent Project objects
   */
  private getLatestProjects(projects: Project[]): Project[] {
    // Sort by date, most recent first
    const sortedProjects = projects.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Take the first 3 items
    return sortedProjects.slice(0, 3);
  }
}
