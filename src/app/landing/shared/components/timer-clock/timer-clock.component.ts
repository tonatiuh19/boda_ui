import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-timer-clock',
  templateUrl: './timer-clock.component.html',
  styleUrls: ['./timer-clock.component.css'],
})
export class TimerClockComponent implements OnInit, OnDestroy, OnChanges {
  @Input() startDate!: string;
  @Input() endDate!: string;
  time: {
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } = { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  animate: {
    months: boolean;
    days: boolean;
    hours: boolean;
    minutes: boolean;
    seconds: boolean;
  } = {
    months: false,
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  };
  private intervalId: any;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'] || changes['endDate']) {
      this.startTimer();
    }
  }

  startTimer(): void {
    this.updateTime();
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime(): void {
    const now = new Date();
    const end = new Date(this.endDate);
    const timeDiff = end.getTime() - now.getTime();

    if (timeDiff <= 0) {
      this.time = { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.intervalId);
    } else {
      const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((timeDiff / (1000 * 60 * 60 * 24)) % 30);
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);

      this.animateChange('months', months);
      this.animateChange('days', days);
      this.animateChange('hours', hours);
      this.animateChange('minutes', minutes);
      this.animateChange('seconds', seconds);

      this.time = { months, days, hours, minutes, seconds };
    }
  }

  animateChange(unit: keyof typeof this.time, newValue: number): void {
    if (this.time[unit] !== newValue) {
      this.animate[unit] = true;
      setTimeout(() => {
        this.animate[unit] = false;
      }, 300);
    }
  }
}
