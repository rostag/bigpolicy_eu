import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poetry',
  templateUrl: './poetry.component.html',
  styleUrls: ['./poetry.component.scss']
})
export class PoetryComponent implements OnInit {

  constructor() { }

  public paused = false;
  public generated = '';

  private movetick = 100;

  private dict = [
    { 'ля': 2 },
    { 'чим': 2 },
    { 'хо': 3 },
    { 'дя': 3 },
    { 'мі': 1 },
    { 'ї': 2 },
    { 'хав': 3 },
    { 'ду': 2 },
    { 'чи': 4 },
    { 'я': 2 },
    { 'тель': 4 },
    { 'шов': 5 },
    { 'ку': 1 },
    { ' ': 9 },
    { 'су': 1 },
    { 'вич': 3 },
    { 'ми': 1 },
    { 'кос': 1 },
    { 'об': 1 },
    { 'дить': 2 },
    { 'учи': 1 },
    { 'му': 1 },
    { 'би': 1 },
    { 'це': 1 },
    { 'цел': 2 },
    { 'том': 1 },
    { 'ко': 1 },
    { 'вал': 1 },
    { 'нєс': 1 },
    { 'дет': 1 },
    { 'но': 1 },
    { 'вез': 1 },
    { 'мет': 1 },
    { 'вет': 1 },
    { 'ви': 1 }
  ];

  private txt =
    `Ду-ми мо-ї, ду-ми мо-ї,
    Ли-хо ме-ні з ва-ми!
    На-що ста-ли на па-пе-рі
    Сум-ни-ми ря-да-ми?..
    Чом вас ві-тер не роз-ві-яв
    В сте-пу, як пи-ли-ну?
    Чом вас ли-хо не прис-па-ло,
    Як сво-ю ди-ти-ну?..

    Бо вас ли-хо на світ на сміх по-ро-ди-ло,
    По-ли-ва-ли сльо-зи. чом не за-то-пи-ли,
    Не ви-не-сли в мо-ре, не роз-ми-ли в по-лі?.
    Не пи-та-ли б люде, що в ме-не бо-лить,
    Не пи-та-ли б, за що про-кли-наю до-лю,
    Чо-го нуд-жу сві-том? «Ні-чо-го ро-би-ть»,—
    Не ска-за-ли б на сміх...

    Кві-ти мо-ї, ді-ти!
    На-що ж вас ко-хав я, на-що дог-ля-дав?
    Чи за-пла-че сер-це од-но на всім сві-ті
    Як я з ва-ми пла-кав Може, і вга-дав
    Може най-деть-ся ді-во-че
    Сер-це ка-рі очі
    Що зап-ла-чуть на сі ду-ми
    Я біль-ше не хо-чу
    Од-ну сльо-зу з о-чей ка-рих
    І пан над па-на-ми
    Ду-ми мо-ї ду-ми мої
    Ли-хо ме-ні з ва-ми!`;

  ngOnInit() {
    this.draw();
    this.go();
  }

  private getText() {
    let a = this.txt.toLowerCase().replace(/\s+/ig, '-');
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
    const s1 = Math.abs(Math.ceil(Math.sin(this.movetick/60) * maxLength));
    const s2 = Math.abs(Math.ceil(Math.sin(this.movetick/90) * maxLength));
    const s3 = Math.abs(Math.ceil(Math.sin(this.movetick/90) * maxLength));
    const s4 = Math.abs(Math.ceil(Math.sin(this.movetick/360) * maxLength));
    
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
      res += this.getNext(this.dict);
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

  /*

  я шёл и думал о сирени
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
  о как мне не хватает вас

  */

}
