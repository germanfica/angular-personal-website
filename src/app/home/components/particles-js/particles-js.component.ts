import { environment } from 'src/environments/environment';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, PLATFORM_ID, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-particles-js',
  templateUrl: './particles-js.component.html',
  styleUrl: './particles-js.component.scss',
  host: { ngSkipHydration: 'true' }
})
export class ParticlesJsComponent {
  isServer: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isServer = isPlatformServer(this.platformId);
    afterNextRender(() => {
      // Safe to check `scrollHeight` because this will only run in the browser, not the server.
      if (isPlatformBrowser(this.platformId)) {
        // Carga particlesJS solo en el lado del cliente
        particlesJS("particles-js", environment.particlesJSConfig);
      }
    });
  }
}
