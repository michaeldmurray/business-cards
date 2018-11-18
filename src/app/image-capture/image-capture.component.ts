// Thanks to Nic Raboy's guide at https://x-team.com/blog/webcam-image-capture-angular/
// Note: My laptop camera wasn't good enough to get parsable images.
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TextDetectionService } from '../text-detection.service';

@Component({
  selector: 'app-image-capture',
  templateUrl: './image-capture.component.html',
  styleUrls: ['./image-capture.component.css']
})
export class ImageCaptureComponent implements OnInit, AfterViewInit {

  @ViewChild('video')
  video: ElementRef;

  @ViewChild('canvas')
  canvas: ElementRef;

  captures: Array<any>;

  constructor(private detectionService: TextDetectionService) {
    this.captures = [];
  }
  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
      });
    }
  }

  onCaptureImage() {
    const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement,
      0, 0, 640, 480);
    const imageUri: String = this.canvas.nativeElement.toDataURL('image/png');
    this.detectionService.textDetection(imageUri);
    this.captures.push(imageUri);
  }
}
