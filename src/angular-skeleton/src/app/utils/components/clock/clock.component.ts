import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { DateTime } from 'luxon';
import { Subject, timer, takeUntil } from 'rxjs';

@Component({
  selector: 'app-clock',
  standalone: true,
  imports: [],
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  date = signal('');
  time = signal('');

  ngOnInit() {
    timer(0, 1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      const now = DateTime.now();
      this.date.set(now.toFormat('yyyy LLL dd'));
      this.time.set(now.toFormat('hh:mm a'));
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
