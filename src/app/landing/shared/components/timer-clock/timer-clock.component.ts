import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-timer-clock',
  templateUrl: './timer-clock.component.html',
  styleUrls: ['./timer-clock.component.css'],
})
export class TimerClockComponent implements OnInit, OnDestroy {
  @Input() startDate!: string;
  @Input() endDate!: string;
  time = {
    months: '',
    days: '',
    hours: '',
    minutes: '',
    seconds: '',
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
      this.time = {
        months: '',
        days: '',
        hours: '',
        minutes: '',
        seconds: '',
      };
      clearInterval(this.intervalId);
    } else {
      const months = this.padZero(
        Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30))
      );
      const days = this.padZero(
        Math.floor((timeDiff / (1000 * 60 * 60 * 24)) % 30)
      );
      const hours = this.padZero(
        Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
      );
      const minutes = this.padZero(Math.floor((timeDiff / (1000 * 60)) % 60));
      const seconds = this.padZero(Math.floor((timeDiff / 1000) % 60));
      //this.time = `${months}:${days}:${hours}:${minutes}:${seconds}`;
      this.time = {
        months,
        days,
        hours,
        minutes,
        seconds,
      };
    }
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
