import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { dictonarySource } from '../models/poetry.model';
import { Rhythm, rhythms } from '../models/rythm.models';
import { DictionaryVO, PoetryService } from '../services/poetry.service';

/*
  senkan
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

  rhythmControl = new FormControl();
  dictionaryControl = new FormControl();

  dictionary: DictionaryVO;
  rhythm: Rhythm;

  rhythms = rhythms;
  poetry: string = '';

  dictionaries: DictionaryVO[];
  reducedDictionary: DictionaryVO;

  constructor(private poetryService: PoetryService) {
    this.dictionaries = this.poetryService.setupDictionaries();
    this.dictionary = this.dictionaries[0];
  }

  private getPoetry(keepDictionary): string {
    const fullDictionary = this.poetryService.getDictionaryByName(this.dictionary.name);
    console.log('Full dic:', fullDictionary);

    dictonarySource.reduced = { name: 'Reduced', value: this.poetry };
    console.log('reduced src : ', dictonarySource.reduced);

    const reducedDictionary = this.poetryService.createDictionaryFromSource(dictonarySource.reduced);
    console.log('Reduced dic:', reducedDictionary);
    const dic = keepDictionary ? reducedDictionary : fullDictionary;
    console.log('Keep dic: ', keepDictionary, 'dic:', dic,);

    return this.getResultFromDicAndRythm(dic, rhythms.salo);
  }

  public onDictionarySelection(d: DictionaryVO) {
    console.log('--->\n--->\n---> Dictionary selection:', d);
    this.dictionary = d;
    this.generate();
  }

  public onRhythmSelection(r: Rhythm) {
    console.log('Rhytm selection:', r);
    this.rhythm = { ...r };
    this.generate(true);
  }

  public reDic() {
    this.generate();
  }

  public reStyle() {
    this.generate(true);
  }

  public getDictionaryCollectionKeys(): DictionaryVO[] {
    return Object['values'](this.dictionaries);
  }

  public getRhytmsCollectionKeys(): [] {
    return Object['values'](this.rhythms);
  }

  public ngOnInit() {
    this.dictionaryControl.valueChanges
      .pipe()
      .subscribe(val => {
        this.onDictionarySelection(val);
      });
    this.generate();
  }

  public setDictionary(dic: DictionaryVO) {
    this.dictionary = dic;
  }

  public setRhyme(ryt: Rhythm) {
    this.rhythm = ryt;
  }

  public generate(keepDictionary = false) {
    this.poetry = this.getPoetry(keepDictionary);
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

  public getResultFromDicAndRythm(dicRef: DictionaryVO, rhymeRef): string {
    this.setDictionary(dicRef);
    this.setRhyme(rhymeRef);
    let result = '';
    const dic: DictionaryVO = { ...dicRef };
    this.rhythm.value.forEach(line => {
      line.forEach(wordLength => {
        const newWord = this.getRandomWordOfGivenLength(dic.dictionary, wordLength, false, false);
        result += newWord + ' ';
      })
      result += '\n';
    })
    return result;
  };

  private callCount = 0;

  private getRandomWordOfGivenLength(dic: string[], wordLength: number, transformVowels = false, removeWordsFromDic = false): string {
    const syllables = 'їёуэеиаоєяіиюыє';
    const randomWord = this.getRandomFromSet(dic);
    let syllablesCount = 0;
    randomWord.split('').forEach(char => {
      syllablesCount += syllables.split('').includes(char) ? 1 : 0;
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
      result += this.getRandomName(this.dictionary.dictionary) + ' ';
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
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
