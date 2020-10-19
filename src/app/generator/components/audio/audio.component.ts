import { Component, OnInit } from '@angular/core';
import { interval ,  Subject } from 'rxjs';
import { timeInterval, take, takeUntil } from 'rxjs/operators';

// ankursethi.in/2016/01/13/build-a-sampler-with-angular-2-webaudio-and-webmidi-lesson-1-introduction-to-the-webaudio-api

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

    public loadingSample = false;

    private audioContext: AudioContext[] = [];
    private audioBuffer: AudioBuffer[] = [];

    private onDestroy$ = new Subject<void>();
    private _binauralFreq: number;
    private _sampleFreq: number;

    public sampleNames = ['kick', 'dsb-thinner'];
    public currentSample = 'dsb-thinner';
    audioInitialized: boolean;

    constructor() { }

    public ngOnInit() { }

    public initAudio() {
        if (this.audioInitialized) {
            return;
        }
        this.audioInitialized = true;
        for (let s = 0; s < this.sampleNames.length; s++) {
            this.loadingSample = true;
            this.fetchSample(this.sampleNames[s])
                .then(audioBuffer => {
                    this.loadingSample = false;
                    this.audioBuffer[this.sampleNames[s]] = audioBuffer;
                })
                .catch(error => {
                    throw error;
                });
        }
    }

    public fetchSample(sampleName): Promise<AudioBuffer> {
        return fetch(`/assets/wav/${sampleName}.wav`)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                return new Promise<AudioBuffer>((resolve, reject) => {
                    this.audioContext[sampleName] = new AudioContext();
                    this.audioContext[sampleName].decodeAudioData(
                        buffer,
                        resolve,
                        reject
                    );
                });
            });
    }

    public stopLoop(loopName) {
        console.log('Loop:', loopName);
        this.onDestroy$.next();
    }

    public playLoop(sample) {
        this.initAudio();
        this._sampleFreq = Math.round(Math.random() * 100) + 100;
        this.initLoop(sample, this._sampleFreq);
    }

    public initLoop(sample, time) {
        interval(time)
            .pipe(
                timeInterval(),
                takeUntil(this.onDestroy$)
            )
            .subscribe(a => {
                this.playSample(sample || this.currentSample);
            });
    }

    public playSample(loopName) {
        const bufferSource = this.audioContext[loopName].createBufferSource();
        bufferSource.buffer = this.audioBuffer[loopName];
        bufferSource.connect(this.audioContext[loopName].destination);
        bufferSource.start(0);
    }

    public y(x) {
        return Math.round(Math.exp(x));
    }

    public r(r) {
        const a = Math.random() * r;
        return Math.round(a * a + a);
    }

    /******
     * Try Hz:
     * 34
     * 94
     * 102
     * 253
     * -264
     * -302
     * -364
     * 404
     ******/

    public playBinaural(sample, baze, hz) {
        this.stopLoop(this.currentSample);
        this._binauralFreq = baze;
        this.initLoop(sample, baze);
        this.initLoop(sample, baze + hz);
    }

    public get binauralFreq() {
        return this._binauralFreq;
    }

    public get sampleFreq() {
        return this._sampleFreq;
    }

}
