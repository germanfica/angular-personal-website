import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { RESPONSE } from 'src/express.token';
import { Response } from 'express';

/**
 * Service to manage 404 (Not Found) HTTP status in Angular applications with Server-Side Rendering (SSR).
 *
 * This service provides a method to set a `404 status code` when a non-existent page is accessed on the server-side.
 * It leverages Angular's `PLATFORM_ID` to determine if the code is running on the server or in the browser,
 * and sets the `404 status code` using Express `Response` object.
 */
@Injectable({
  providedIn: 'root'
})
export class PageNotFoundService {
  private isServer: boolean;
  private isBrowser: boolean;

  /**
   * @param {Object} platformId - A token that indicates the platform the application is running on.
   * @param {Response | null} response - The Express response object, used on the server to set HTTP status codes.
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Optional() @Inject(RESPONSE) private response: Response) {
    this.isServer = isPlatformServer(platformId);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  /**
    * Sets the HTTP status code to 404 (Not Found) if the service is executed on the server side.
    *
    * Logs a warning if the method is mistakenly called on the client side, as 404 status should
    * only be set server-side to inform clients about non-existent resources.
    */
  setNotFoundStatusCode(): void {
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
