import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { RESPONSE } from 'src/express.token';
import { Response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class PageNotFoundService {
  private isServer: boolean;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Optional() @Inject(RESPONSE) private response: Response) {
    this.isServer = isPlatformServer(platformId);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setNotFoundStatus(): void {
    if (this.isBrowser && !this.isServer) {
      console.error(
        `Oops! It seems like you're trying to navigate to a non-existent page from the client-side. ` +
        `In Angular SSR, certain actions like setting a 404 status should be performed on the server-side. ` +
        `When using \`setNotFoundStatus()\`, please ensure that you are not redirecting to non-existent pages with \`@angular/router\`.`
      );
      console.warn(
        `Hint: Try refreshing the page to retrieve any server-side changes, including 404 status code updates.`
      );
    }

    if (this.isServer && this.response) {
      console.log("Great! This is the server side view. Sending 404 status code...")
      console.error("404 not found")
      this.response.status(404);
    }
  }
}
