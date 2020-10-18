import { Component, OnInit } from '@angular/core';
import { dumyMoiDumy, syllablesDict } from '../models/poetry.model';

@Component({
  selector: 'app-poetry-x',
  templateUrl: './poetry-x.component.html',
  styleUrls: ['./poetry-x.component.scss']
})

export class PoetryXComponent implements OnInit {

  constructor() { }

  public paused = false;
  public generated = '';

  private movetick = 100;

  ngOnInit() {
    this.draw();
    this.go();
  }

  private getText() {
    let a = dumyMoiDumy.toLowerCase().replace(/\s+/ig, '-');
    a = a.replace(/\n/ig, '-');
    a = a.replace(/,/ig, '');
    a = a.replace(/!/ig, '');
    a = a.replace(/\./ig, '');
    a = a.replace(/\?/ig, '');
    a = a.replace(/\?/ig, '');
    a = a.replace(/»/ig, '');
    a = a.replace(/«/ig, '');

    // TODO
    // const arr = a.split('-').sort();
    // console.log('text:', a);
    // console.log('text arr:', arr);
  }

  public go() {
    if (!this.paused) {
      this.movetick++;
      if (this.movetick % 4 === 0) {
        this.draw();
      }
    }
  }

  public draw() {
    this.generated = `${this.get9898()}`;
  }

  public save() {
    console.log('Save:', this.generated);
    this.paused = !this.paused;
    this.getText();
  }

  public get sin() {
    const maxLength = 5;
    const s1 = Math.abs(Math.ceil(Math.sin(this.movetick / 60) * maxLength));
    const s2 = Math.abs(Math.ceil(Math.sin(this.movetick / 90) * maxLength));
    const s3 = Math.abs(Math.ceil(Math.sin(this.movetick / 90) * maxLength));
    const s4 = Math.abs(Math.ceil(Math.sin(this.movetick / 360) * maxLength));

    return `
      ${this.getByCount(s1).trim()}\n
      ${this.getByCount(s1).trim()}\n
      ${this.getByCount(s1).trim()}\n
      ${this.getByCount(s1).trim()}`;
  }

  public get9898() {
    return `
      ${this.getByCount(9).trim()}\n
      ${this.getByCount(8).trim()}\n
      ${this.getByCount(9).trim()}\n
      ${this.getByCount(8).trim()}
      `;
  }

  public get2424() {
    return `
      ${this.getByCount(2).trim()}\n
      ${this.getByCount(4).trim()}\n
      ${this.getByCount(2).trim()}\n
      ${this.getByCount(4).trim()}
      `;
  }

  public getByCount(count) {
    let res = '';
    for (let c = 0; c < count; c++) {
      res += this.getNext(syllablesDict);
    }
    return `${count}: ${res}`;
  }

  /*
  size_t nth = rand() % count;
  size_t all = 0;
  for (const auto &n : next) {
    all += n.count;
    if (all >= nth)
        return n.word;
  }
  */

  public getNext(dict: any) {
    const nth = Math.random() * dict.length;
    let all = 0;
    for (let n = 0; n < dict.length; n++) {
      all += Object['values'](dict[n])[0];
      if (all > nth) {
        let result = Object.keys(dict[n])[0];
        // if ((result as string).trim().length === 0) {
        //   result += this.getNext(this.dict);
        // }
        return result;
      }
    }
  }
}
