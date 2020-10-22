import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { latynize } from 'app/generator/generator-helpers';
import { dictonarySource } from '../models/poetry.model';
import { Rhyme, Rhymes, rhymes } from '../models/rythm.models';
import { Dictionary, PoetryService } from '../services/poetry.service';

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
    console.log('\n---> Dictionary:', d);
    this.dictionary = d;
    this.generate();
  }

  public onRhymeSelection(rhyme: Rhyme) {
    this.setRhyme(rhyme);
    this.generate();
  }

  public reDic() {
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

  private getRandomFromSet = (set: any[]): string => {
    const result = set[Math.round(Math.random() * set.length - 1)];
    if (!!result || this.getRandomFromSet['callCount'] > 1000) {
      // console.log('-', result, this.getRandomFromSet['callCount'] );
      this.getRandomFromSet['callCount'] = 0;
      return result || '';
    } else {
      this.getRandomFromSet['callCount'] = this.getRandomFromSet['callCount'] + 1;
      return this.getRandomFromSet(set);;
    }
  };

  public getPoetryFromDicAndRythm(): string {
    let result = '';
    this.rhyme.value.forEach(line => {
      line.forEach(wordLength => {
        const newWord = this.getRandomWordOfGivenLength(this.dictionary.words, wordLength, false, false);
        result += newWord + ' ';
      })
      result += '\n';
    })
    return result;
  };

  private callCount = 0;

  private getRandomWordOfGivenLength(dic: string[], wordLength: number, transformVowels = false, removeWordsFromDic = false): string {
    const vowels = 'їёуэеиаоєяіиюыєeuioay';
    const randomWord = this.getRandomFromSet(dic);
    let syllablesCount = 0;
    randomWord.split('').forEach(char => {
      syllablesCount += vowels.split('').includes(char) ? 1 : 0;
    })
    if (syllablesCount === wordLength || this.callCount > 100) {
      // console.log(':', this.callStack, syllablesCount, randomWord);
      if (removeWordsFromDic) {
        dic.splice(dic.indexOf(randomWord), 1);
      }
      let w = randomWord;
      if (transformVowels) {
        w = w
          .replace(/ї/g, 'Ї').replace(/ё/g, 'Ё').replace(/у/g, 'У')
          .replace(/э/g, 'Э').replace(/е/g, 'Е').replace(/и/g, 'И')
          .replace(/о/g, 'О').replace(/є/g, 'Є').replace(/а/g, 'А')
          .replace(/я/g, 'Я').replace(/і/g, 'І').replace(/ю/g, 'Ю')
          .replace(/ы/g, 'Ы');
      }
      this.callCount = 0;
      return w;
    } else {
      this.callCount++;
      return this.getRandomWordOfGivenLength(dic, wordLength);
    }
  }

  private getRandomName = (dictionary: string[]) => {
    const key: string = this.getRandomFromSet(dictionary);
    const randomLen = Math.min(Math.max(Math.floor(Math.random() * key.length), 4), 10);
    return (
      key[Math.floor(Math.random() * key.length)].toUpperCase() +
      key
        .substr(key.length - randomLen)
        .toLowerCase()
        .replace(/_/g, ' ')
    );
  };

  private getRandomDescription = (wordCount) => {
    let result = '',
      i = 0;
    do {
      result += this.getRandomName(this.dictionary.words) + ' ';
      i++;
    } while (i < wordCount);
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
}
