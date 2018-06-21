
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

    public ac: AudioContext;

    public loadingSample = false;

    private audioBuffer: AudioBuffer;

    constructor() { }

    public ngOnInit() {
        this.createAudio();

        this.loadingSample = true;
        this.fetchSample()
            .then(audioBuffer => {
                this.loadingSample = false;
                this.audioBuffer = audioBuffer;
            })
            .catch(error => {
                throw error;
            });
    }

    public createAudio() {
        this.ac = new AudioContext();
        console.log(`Init audio:
        https://ankursethi.in/2016/01/13/build-a-sampler-with-angular-2-webaudio-and-webmidi-lesson-1-introduction-to-the-webaudio-api/`);
    }

    public fetchSample(): Promise<AudioBuffer> {
        return fetch('/assets/wav/kick.wav')
            .then(response => response.arrayBuffer())
            .then(buffer => {
                return new Promise<AudioBuffer>((resolve, reject) => {
                    this.ac.decodeAudioData(
                        buffer,
                        resolve,
                        reject
                    );
                });
            });
    }

    public playSample() {
        const bufferSource = this.ac.createBufferSource();
        bufferSource.buffer = this.audioBuffer;
        bufferSource.connect(this.ac.destination);
        bufferSource.start(0);
    }

}
