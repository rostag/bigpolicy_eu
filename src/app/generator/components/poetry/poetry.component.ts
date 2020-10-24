import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getRandomFromSet, getRandomWordOfGivenLength, latynize } from 'app/generator/generator-helpers';
import { dictonarySource } from '../models/poetry.model';
import { Rhyme, Rhymes, rhymes } from '../models/rythm.models';
import { Dictionary, PoetryService, Word } from '../services/poetry.service';

/*
  pyro / senkan
  я бог 
  ты бросая 
  сукой волосами 
  красным которые лона 
  меня 
*/

@Component({
  selector: 'app-poetry',
  templateUrl: './poetry.component.html',
  styleUrls: ['./poetry.component.scss']
})
export class PoetryComponent implements OnInit {

  rhymeControl = new FormControl();
  dictionaryControl = new FormControl();
  latynizeControl = new FormControl(true);

  dictionaries: Dictionary[];
  dictionary: Dictionary;

  rhymes: Rhymes;
  rhyme: Rhyme;

  poetry: string = '';

  constructor(private poetryService: PoetryService) {
    this.dictionaries = this.poetryService.setupDictionaries();
    this.dictionary = this.dictionaries[0];
  }

  public onDictionarySelection(d: Dictionary) {
    this.dictionary = d;
    this.generate();
  }

  public onRhymeSelection(rhyme: Rhyme) {
    this.setRhyme(rhyme);
    this.generate();
  }

  public reSlovo() {
    this.generate();
  }

  public reStyle() {
    this.generate();
  }

  public getDictionaries(): Dictionary[] {
    return Object['values'](this.dictionaries);
  }

  public getRhymes(): [] {
    return Object['values'](this.rhymes);
  }

  public ngOnInit() {
    this.dictionaryControl.valueChanges.pipe().subscribe(val => this.onDictionarySelection(val));
    this.rhymeControl.valueChanges.pipe().subscribe(val => this.onRhymeSelection(val));
    this.latynizeControl.valueChanges.pipe().subscribe(val => this.generate())

    this.rhymes = rhymes;
    this.setRhyme(this.rhymes.haiku);
  
    this.generate();
  }

  public setDictionary(dic: Dictionary) {
    this.dictionary = dic;
  }

  public setRhyme(rhyme: Rhyme) {
    this.rhyme = rhyme;
  }

  public generate() {
    const keepDictionary = false;
    const toLatynize = this.latynizeControl.value;

    dictonarySource.reduced = { name: 'Reduced', value: this.poetry };
    const fullDictionary = this.poetryService.getDictionaryByName(this.dictionary.name);
    const reducedDictionary = this.poetryService.createDictionaryFromSource(dictonarySource.reduced);
    this.dictionary = keepDictionary ? reducedDictionary : fullDictionary;
    const poetry = this.getPoetryFromDicAndRythm();

    this.poetry = toLatynize ? latynize(poetry) : poetry;
  }

  public getPoetryFromDicAndRythm(): string {
    let result = '';
    this.rhyme.value.forEach(line => {
      line.forEach(wordLength => {
        const newWord = getRandomWordOfGivenLength(this.dictionary.words, wordLength, false, false);
        result += newWord + ' ';
      })
      result += '\n';
    })
    return result;
  };

  public copyText(event: MouseEvent) {
    event.preventDefault;
    event.stopPropagation();
    const val = this.poetry;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    const today = new Date().toDateString();
    const framework = this.dictionary.name + ' / ' + this.rhyme.name;
    selBox.value = `${framework} - ${today} \n\n${val} \n* * *\n\n`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  // OOPO
  _words = [
    {
      content: 'Hi'
    },
    {
      content: 'Hello'
    }
  ]

  get words(): Word[] {
    return this._words;
  }

  reword(word): void {
    const newWord = getRandomFromSet(this._words);
    const index = this._words.indexOf(word);
    this._words[index] = newWord;
    console.log('Words:', this._words);
    
  }
}
