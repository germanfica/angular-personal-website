import { Component } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: false,
  template: `
    <div class="box">
      <h1 class="error">Oh no! Failed to send :(</h1>
      <p>Your message has not been sent. Please try again after a few minutes 🙏</p>
    </div>
  `,
  styles: [`
    :host {
      .box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      .mb25 {
        margin-bottom: 25px;
      }

      .error {
        color: var(--danger-color);
      }
    }
  `]
})
export class ErrorMessageComponent {}
