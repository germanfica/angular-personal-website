import { isPlatformServer } from '@angular/common';
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

  /**
   * @param {Object} platformId - A token that indicates the platform the application is running on.
   * @param {Response | null} response - The Express response object, used on the server to set HTTP status codes.
   */
  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Optional() @Inject(RESPONSE) private response: Response) {
    this.isServer = isPlatformServer(platformId);
  }

  /**
    * Sets the HTTP status code to 404 (Not Found) if the service is executed on the server side.
    *
    */
  setNotFoundStatusCode(): void {
    if (this.isServer && this.response) {
      this.response.status(404);
    }
  }
}
