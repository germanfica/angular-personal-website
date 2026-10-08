import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-message',
  standalone: false,
  template: `
    <div class="box">
      <h1 class="loading">Sending... Please wait :)</h1>
      <span class="contact-loading-spinner" role="status" aria-label="Sending message"></span>
      <p>Almost there. This may take a few seconds.</p>
    </div>
  `,
  styleUrls: ['./loading-message.component.scss']
})
export class LoadingMessageComponent {}
