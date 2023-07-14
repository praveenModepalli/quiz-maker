import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  showLoaderIcon = new Subject<boolean>();

  constructor() { }

  showLoader(): void {
    this.showLoaderIcon.next(true);
  }

  hideLoader(): void {
    this.showLoaderIcon.next(false);
  }
}
