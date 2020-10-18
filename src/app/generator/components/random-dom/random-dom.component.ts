import { Component, OnInit } from '@angular/core';
import { str } from '../models/poetry.model';
import { Rhythm, RhythmEntry, rhythms } from '../models/rythm.models';
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
  selector: 'app-random-dom',
  templateUrl: './random-dom.component.html',
  styleUrls: ['./random-dom.component.scss']
})
export class RandomDomComponent implements OnInit {

  public generated: string = '';
  public dictionary: DictionaryVO;
  public rythm: Rhythm;
  public rhythms = rhythms;

  constructor(private poetryService: PoetryService) { }

  private renderPoetry(): string {
    // const dicGGWords = this.poetryService.getDicFromString(str.gg, '--SECTION-->');
    // const dicDumy = this.poetryService.getDicFromString(str.dumy, '\n\n', '\n', ' ', '-');
    // const dicKob = this.poetryService.getDicFromString(str.kob, '\n\n', '\n', ' ');
    // const dicPyro = this.poetryService.getDicFromString(str.pyro, '\n\n', '\n', ' ');
    // const dicNumbers = this.poetryService.getDicFromString(str.numbers, '\n\n', '\n', ' ');
    const dicHam = this.poetryService.getDicFromString(str.ham, '\n\n', '\n', ' ');

    // const mergedDic = dicGGWords.dictionary.concat(dicDumy, dicGGWords);

    return this.getResultFromDicAndRythm(dicHam, rhythms.salo);
  }

  public copyText(event: MouseEvent) {
    event.preventDefault;
    event.stopPropagation();
    const val = this.generated;
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

  public ngOnInit() {
    this.generate();
  }

  public setDictionary(dic: DictionaryVO) {
    this.dictionary = dic;
  }

  public setRythm(ryt: Rhythm) {
    this.rythm = ryt;
  }

  public generate() {
    this.generated = this.renderPoetry();
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

  public getResultFromDicAndRythm(dicRef: DictionaryVO, rythmRef): string {
    this.setDictionary(dicRef);
    this.setRythm(rythmRef);
    let result = '';
    const dic: DictionaryVO = {...this.dictionary};
    this.rythm.value.forEach(line => {
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
}
