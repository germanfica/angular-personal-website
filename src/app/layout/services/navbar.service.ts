import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private _navbarState = new BehaviorSubject<{ isSticky: boolean, navbarStyle: 'transparent' | 'colored-pos-abs' | 'colored' }>({
    isSticky: true,
    navbarStyle: 'transparent'
  });

  navbarState$ = this._navbarState.asObservable();

  constructor() { }

  updateNavbarState(state: { isSticky: boolean, navbarStyle: 'transparent' | 'colored-pos-abs' | 'colored' }) {
    this._navbarState.next(state);
  }
}
