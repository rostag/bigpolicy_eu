import { Component, OnInit } from '@angular/core';

export interface IEntity {
  name: string;
  description: string;
  globalOne: string;
  provider: string;
}

export interface IKeys { }

@Component({
  selector: 'app-random-dom',
  templateUrl: './random-dom.component.html',
  styleUrls: ['./random-dom.component.scss']
})
export class RandomDomComponent implements OnInit {

  public generated: string = '';
  public dictionary: string[] = [];
  public rythm: number[][] = [[]];

  private mockProviders = ['Acme, Inc.', 'Telepost', 'Drm Sltns', 'Deere.com'];
  private mockLoadBalancing = ['Yes', 'No'];

  constructor() { }

  public ngOnInit() {
    this.setDictionary(Object.keys(window));
    const a = this.getRandomName(this.dictionary);
    console.log(a);
    this.generate();
  }

  public setDictionary(dic: string[]) {
    this.dictionary = dic;
    this.mockProviders = ['### ', '#@&?', 'XXYY--ZZ', '---------'];
    this.mockLoadBalancing = ['!', '...', '.', ';'];
  }
  
  public setRythm(ryt: number[][]) {
    this.rythm = ryt;
  }

  public generate() {
    let d = this.getDnsAndDomainRandom();
    this.generated = `${d.name} ${d.description} ${d.provider} ${d.globalOne}`;

    const p = this.getPyroSample();
    this.generated = p;
  }

  private getRandomFromSet = (set: any[]): string => {
    const result = set[Math.round(Math.random() * set.length - 1)];
    return !!result ? result : this.getRandomFromSet(set);;
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

  private getDnsAndDomainRandom = () => {
    const a: IEntity = {
      name: this.getRandomName(this.dictionary),
      description: this.getRandomDescription(5),
      provider: this.getRandomFromSet(this.mockProviders),
      globalOne: this.getRandomFromSet(this.mockLoadBalancing)
    };
    return a;
  };


  private getIKeysMock(): IKeys[] {
    const n = 15;
    const result = [];
    for (let i = 0; i < n; i++) {
      result.push(this.getDnsAndDomainRandom());
    }
    console.log('Result:', result)
    return result;
  };

  private getPyroSample(): string {
    let pyroDictionary = [];
    const aLevel1 = this.pyroSample.split('\n\n');
    aLevel1.forEach(al1 => {
      const aLevel2 = al1.split('\n');
      aLevel2.forEach(al2 => {
        const aLevel3 = al2.trim();
        pyroDictionary = pyroDictionary.concat(aLevel3.split(' '));
      })
    });
    
    this.setDictionary(pyroDictionary);

    this.setRythm([
      [1, 1, 1, 2, 1, 2],
      [2, 3, 3],
      [1, 3, 1, 4],
      [1, 2, 1, 3, 2]
    ]);

    return this.getResultFromDicAndRythm();
  }

  public getResultFromDicAndRythm(): string {
    let result = '';    
    const dic = [...this.dictionary];
    this.rythm.forEach(line => {
      line.forEach(wordLength => {
        // get random word of needed length from temp dic and remove it from there:
        result += this.getRandomWordOfGivenLength(dic, wordLength) + ' ';
      })
      result += '\n';
    })
    return result;
  };

  private getRandomWordOfGivenLength(dic: string[], wordLength: number): string {
    const syllables = 'їёуэеиаоєяіию';
    const randomWord = this.getRandomFromSet(dic);
    let syllablesCount = 0;
    randomWord.split('').forEach(char => {
      syllablesCount += syllables.split('').includes(char) ? 1 : 0;
    })
    if (syllablesCount === wordLength) {
      return randomWord;
    } else {
      return this.getRandomWordOfGivenLength(dic, wordLength);
    }
  }

  private pyroSample = 
  `я шёл и думал о сирени
  вокруг визжали тормоза
  я выживал и приближался
  к местам где водится сирень

  хотела б я писать про вишни
  описывать как каждый день
  я выношу ведро с костями
  от вишен съеденных вчера

  сирень работает как чудо
  когда не смотрим на неё
  она как раз и производит
  нам лишний пятый лепесток

  сейчас я медленно открою
  ты так же медленно войдёшь
  ботинки снимешь осторожно
  в них вложишь снятые носки

  поели как обычно молча
  она стояла у окна
  вдруг обернулась и сказала
  оксимирон поёт как бог

  у нас немного потеплело
  и есть свободные слова
  которые тебя согреют
  пришлю их заказным письмом

  я был в краях где слов так мало
  что ими греются в мороз
  и лечат ими от болезней
  поэтому я не писал

  домохозяйка плачет в ванне
  чем экономит полчаса
  а то б пришлось сначала плакать
  а после ванну принимать

  меня кормили красным мясом
  поили огненной водой
  я выросла красивой сукой
  но с волосами на руках

  сегодня в ночь весна выходит
  она сидела взаперти
  её консервами кормили
  личинок майского жука

  кто верит мне что я богиня
  тот приезжает в три утра
  куда то в пермский частный сектор
  чтоб дать мне денег на такси

  с обратной стороны витрины
  вид на бульвар и мокрый снег
  и отвести глаза не может
  полураздетый манекен

  табло валют в окне мигает
  нам есть о чём поговорить
  ты привела с собой собачку
  а я в наушниках пришол

  вчера в саду поймали вора
  он нюхал редкие цветы
  и втягивал ноздрями запах
  и уносил его с собой

  четвёртый муж ушол в монахи
  он как и прежние мужья
  не сразу понял что лариса
  им не для счастия дана

  за сутки перед хэллоином
  я тьму старалась приручить
  бросая леденцы и чипсы
  в особо тёмные углы

  я прямо в душу вам смотрела
  и видела что вы не тот
  кем вы казались и мне нужно
  сию минуту вас убить

  и тут на мне повисли трое
  когда я совершил рывок
  с письмом в зубах на имя бога
  в котором объяснялось всё

  я из лона сказал геннадий
  а я из чрева молвил пётр
  а зинаида промолчала
  поскольку грубая была

  товарищ деньги я скучаю
  по нашим дням былых безумств
  мне вас ужасно не хватает
  о как мне не хватает вас`;

}
