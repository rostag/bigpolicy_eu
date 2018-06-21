
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  public ac: AudioContext;

  constructor() { }

  ngOnInit() {
    this.createAudio();
  }

  createAudio() {
    this.ac = new AudioContext();
    console.log('Init audio:');
  }

}
