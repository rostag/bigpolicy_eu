import { Component, OnInit } from '@angular/core';
import { salo } from '../models/rythm.models';
import { PoetryService, str } from '../services/poetry.service';

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
  public dictionary: string[] = [];
  public rythm: number[][] = [[]];

  constructor(
    private poetryService: PoetryService,
    ) { }

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
    this.setDictionary(Object.keys(window));
    const a = this.getRandomName(this.dictionary);
    console.log('Poy:', a);
    this.generate();
  }

  public setDictionary(dic: string[]) {
    this.dictionary = dic;
  }
  
  public setRythm(ryt: number[][]) {
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
      result += this.getRandomName(this.dictionary) + ' ';
      i++;
    } while (i < wordCount);
    return result;
  };

  private renderPoetry(): string {
    const dicGGWords = this.poetryService.getDicByName(str.wordsWithGG, '--SECTION-->');
    const dicDumy = this.poetryService.getDicByName(str.dumyMoiDumy, '\n\n', '\n', ' ', '-');
    const dicKobzar = this.poetryService.getDicByName(str.kobzar, '\n\n', '\n', ' ');
    const dicPyro = this.poetryService.getDicByName(str.wordsOfPyro, '\n\n', '\n', ' ', '-');
    const dicNumbers = this.poetryService.getDicByName(str.wordNumbers, '\n\n', '\n', ' ', '-');
    
    // const mergedDic = dicGGWords.concat(dicDumy, dicKobzar);

    return this.getResultFromDicAndRythm(dicKobzar, salo);
  }

  public getResultFromDicAndRythm(dicRef, rythmRef): string {
    this.setDictionary(dicRef);
    this.setRythm(rythmRef);
    let result = '';    
    const dic = [...this.dictionary];
    this.rythm.forEach(line => {
      line.forEach(wordLength => {
        // get random word of needed length from temp dic and remove it from there:
        const newWord = this.getRandomWordOfGivenLength(dic, wordLength, false, false);
        result += newWord + ' ';
      })
      result += '\n';
    })
    return result;
  };

  private callStack = 0;

  private getRandomWordOfGivenLength(dic: string[], wordLength: number, transformVowels = false, removeWordsFromDic = false): string {
    const syllables = 'їёуэеиаоєяіиюыє';    
    const randomWord = this.getRandomFromSet(dic);
    let syllablesCount = 0;
    randomWord.split('').forEach(char => {
      syllablesCount += syllables.split('').includes(char) ? 1 : 0;
    })
    if (syllablesCount === wordLength || this.callStack > 100) {
      // console.log(':', this.callStack, syllablesCount, randomWord);

      if (removeWordsFromDic) {
        dic.splice(dic.indexOf(randomWord), 1);
      }
      let w = randomWord;
      if (transformVowels) {
        w = w.replace(/ї/g, 'Ї');
        w = w.replace(/ё/g, 'Ё');
        w = w.replace(/у/g, 'У');
        w = w.replace(/э/g, 'Э');
        w = w.replace(/е/g, 'Е');
        w = w.replace(/и/g, 'И');
        w = w.replace(/о/g, 'О');
        w = w.replace(/є/g, 'Є');
        w = w.replace(/а/g, 'А');
        w = w.replace(/я/g, 'Я');
        w = w.replace(/і/g, 'І');
        w = w.replace(/ю/g, 'Ю');
        w = w.replace(/ы/g, 'Ы');
      }
      this.callStack = 0;
      return w;
    } else {
      this.callStack++;
      return this.getRandomWordOfGivenLength(dic, wordLength);
    }
  }

}
