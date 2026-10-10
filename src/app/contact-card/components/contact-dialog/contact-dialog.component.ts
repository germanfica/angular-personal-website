import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactCardDialogService } from '../../services/contact-card-dialog.service';

const OPEN_CLASS = 'contact-dialog--open';
const OPENING_CLASS = 'contact-dialog--opening';
const CLOSING_CLASS = 'contact-dialog--closing';
const OPEN_ANIMATION_DURATION = 150;
const CLOSE_ANIMATION_DURATION = 75;
const BACKDROP_ANIMATION_DURATION = 400;
const TRANSITION_DURATION_PROPERTY = '--contact-dialog-transition-duration';

@Component({
  selector: 'app-contact-dialog',
  standalone: false,
  template: `
    <div *ngIf="renderDialog" #dialogContainer class="contact-backdrop contact-dialog"
      (click)="dialog.close()">
      <div class="contact-dialog-backdrop" aria-hidden="true"></div>
      <div class="contact-dialog-inner-container">
        <section class="contact-panel contact-dialog-surface" role="dialog" aria-modal="true"
          aria-label="Formulario de contacto" (click)="$event.stopPropagation()">
          <app-contact-card [inDialog]="true"></app-contact-card>
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host .contact-backdrop {
      position: fixed;
      inset: 0;
      z-index: 1100;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow-y: auto;
    }

    /* Independent backdrop fade, matching the overlay timing. */
    :host .contact-dialog-backdrop {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.32);
      opacity: 0;
      transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    :host .contact-dialog--open .contact-dialog-backdrop {
      opacity: 1;
    }

    /* Opacity transition */
    :host .contact-dialog-inner-container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity linear var(--contact-dialog-transition-duration, 0ms);
    }

    :host .contact-dialog--closing .contact-dialog-inner-container {
      transition: opacity 75ms linear;
      transform: none;
    }

    :host .contact-dialog--open .contact-dialog-inner-container {
      opacity: 1;
    }

    /* Opening scale and easing */
    :host .contact-panel {
      width: min(654px, 100vw);
      max-height: 100dvh;
      overflow-y: auto;
      transform: scale(0.8);
      transition: transform var(--contact-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
    }

    /* The dialog fades out without shrinking the surface on close */
    :host .contact-dialog--open .contact-dialog-surface,
    :host .contact-dialog--closing .contact-dialog-surface {
      transform: none;
    }

    @media (prefers-reduced-motion: reduce) {
      :host .contact-dialog-backdrop,
      :host .contact-dialog-inner-container,
      :host .contact-dialog-surface {
        transition: none;
      }
    }
  `]
})
export class ContactCardDialogComponent implements OnInit, OnDestroy {
  // Unlike the service's isOpen flag, this remains true until the exit transition ends.
  renderDialog = false;

  private readonly subscription = new Subscription();
  private containerElement: HTMLElement | null = null;
  private animationFrame: number | null = null;
  private animationTimer: ReturnType<typeof setTimeout> | null = null;

  @ViewChild('dialogContainer')
  set dialogContainer(ref: ElementRef<HTMLElement> | undefined) {
    this.containerElement = ref?.nativeElement ?? null;

    // The initial animation must start after *ngIf has created the element.
    if (this.containerElement && this.dialog.isOpen) {
      this.startOpenAnimation();
    }
  }

  constructor(public dialog: ContactCardDialogService) {}

  ngOnInit(): void {
    this.subscription.add(this.dialog.visible$.subscribe(isOpen => {
      if (isOpen) {
        this.renderDialog = true;
        // Handles opening again while the exit transition is still running.
        if (this.containerElement) this.startOpenAnimation();
      } else if (this.renderDialog) {
        this.startExitAnimation();
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.clearPendingAnimation();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.dialog.isOpen) this.dialog.close();
  }

  private startOpenAnimation(): void {
    const element = this.containerElement;
    if (!element) return;

    this.clearPendingAnimation();
    element.classList.remove(CLOSING_CLASS);

    if (!this.animationsEnabled) {
      element.classList.add(OPEN_CLASS);
      return;
    }

    element.style.setProperty(TRANSITION_DURATION_PROPERTY, `${OPEN_ANIMATION_DURATION}ms`);
    this.animationFrame = requestAnimationFrame(() => {
      this.animationFrame = null;
      element.classList.add(OPENING_CLASS, OPEN_CLASS);
    });
    this.waitForAnimationToComplete(OPEN_ANIMATION_DURATION, () => {
      element.classList.remove(OPENING_CLASS);
    });
  }

  private startExitAnimation(): void {
    const element = this.containerElement;
    this.clearPendingAnimation();

    if (!element || !this.animationsEnabled) {
      this.renderDialog = false;
      return;
    }

    element.classList.remove(OPEN_CLASS);
    element.style.setProperty(TRANSITION_DURATION_PROPERTY, `${CLOSE_ANIMATION_DURATION}ms`);
    this.animationFrame = requestAnimationFrame(() => {
      this.animationFrame = null;
      element.classList.add(CLOSING_CLASS);
    });
    // The surface exits in 75ms, but the backdrop fades for 400ms.
    // Keep the overlay mounted until both transitions have finished.
    this.waitForAnimationToComplete(BACKDROP_ANIMATION_DURATION, () => {
      if (!this.dialog.isOpen) this.renderDialog = false;
    });
  }

  private get animationsEnabled(): boolean {
    return typeof window !== 'undefined' &&
      typeof requestAnimationFrame === 'function' &&
      !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }

  private waitForAnimationToComplete(duration: number, callback: () => void): void {
    this.animationTimer = setTimeout(() => {
      this.animationTimer = null;
      callback();
    }, duration);
  }

  private clearPendingAnimation(): void {
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    if (this.animationTimer !== null) {
      clearTimeout(this.animationTimer);
      this.animationTimer = null;
    }
  }
}
