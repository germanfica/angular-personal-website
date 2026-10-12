import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from './layout/layout.module';

@Component({
  imports: [RouterOutlet, LayoutModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('personal');
}
