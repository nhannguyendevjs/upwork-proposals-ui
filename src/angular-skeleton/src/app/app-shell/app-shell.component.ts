import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { take, timer } from 'rxjs';
import { BaseComponent } from '../utils/abstract/base.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent extends BaseComponent implements OnInit {
  #router = inject(Router);

  ngOnInit() {
    timer(1000).pipe(take(1)).subscribe(() => {
      this.#router.navigate(['/dashboard']);
    });
  }

  clearAppStorage() {
    localStorage.clear();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }
}
