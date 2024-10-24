import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { fromLanding } from '../../store/selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css'],
})
export class VideoUploadComponent implements OnInit {
  @Input() uploadForm!: FormGroup;
  @Input() videoControlName: string = 'video';
  @Input() loading: boolean = false;
  @Output() loadingChange = new EventEmitter<boolean>();
  @Output() messageChange = new EventEmitter<string>();

  public selectLandingState$ = this.store.select(
    fromLanding.selectLandingState
  );

  public idUser = 0;

  message: string = ''; // Add this line to define the message property

  private unsubscribe$ = new Subject<void>();

  constructor(private http: HttpClient, private store: Store) {}

  ngOnInit(): void {
    this.selectLandingState$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        console.log(state);
        this.idUser = state.guest?.id_guest ?? 0;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        [this.videoControlName]: file,
      });
    }
  }

  uploadVideo() {
    if (this.uploadForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append(
      this.videoControlName,
      this.uploadForm.get(this.videoControlName)?.value
    );
    formData.append('id_user', this.idUser.toString());

    this.loadingChange.emit(true);
    this.http
      .post<any>('https://garbrix.com/boda/api/uploadVideo.php', formData)
      .subscribe(
        (res) => {
          this.message = res.message; // Update the message property
          this.messageChange.emit(this.message);
          this.loadingChange.emit(false);
        },
        (err) => {
          this.message = 'Upload failed'; // Update the message property
          this.messageChange.emit(this.message);
          this.loadingChange.emit(false);
        }
      );
  }
}
