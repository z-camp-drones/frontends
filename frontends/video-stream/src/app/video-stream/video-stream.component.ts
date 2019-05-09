import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import JSMpeg from './jsmpeg.min';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss'],
})
export class VideoStreamComponent implements AfterViewInit {
  @ViewChild('videocanvas', {read: ElementRef}) canvas: ElementRef;

  constructor() {
  }

  ngAfterViewInit(): void {
    console.log(`On Init`);
    let canvas = this.canvas.nativeElement;
    let wsUrl = 'ws://' + document.location.hostname + ':8083/';
    console.log(wsUrl);


    let player = new JSMpeg.Player(wsUrl, {canvas: canvas});
  }

}
