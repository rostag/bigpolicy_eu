import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-news',
  templateUrl: './c-news.component.html',
  styleUrls: ['./c-news.component.scss']
})
export class CNewsComponent implements OnInit {

  public news: string = 'Новини:';

  constructor() { }

  ngOnInit() {
    this.generate();
  }

  public generate() {
    let intro = [
      "Внимание!",
      "Срочно.",
      "Всем привет.",
      "Уважаемые родители!"
    ];

    let subject = [
      "Мне",
      "Соседу",
      "Мужу на работе",
      "Сестре домой",
      "Сыну подруги"
    ];

    let action = [
      "позвонил",
      "сказал",
      "написал",
      "подсказал"
    ];

    let provider = [
      "знакомый из министерства",
      "друг из очага эпидемии",
      "брат",
      "дядя",
      "родственник \"оттуда\""
    ];

    let requested = [
      "и попросил",
      "и потребовал",
      "и предупредил, что нужно"
    ];

    let message = [
      "никому не говорить, что",
      "всем рассказать, что"
    ];

    let is = [
      "на самом деле дела"
    ];

    let content = [
      "уже лучше.",
      "еще хуже.",
      "совсем не так.",
      "так и есть."
    ];

    let soon = [
      "И скоро"
    ];

    let result = [
      "все умрем.",
      "все будет хорошо.",
      "начнуть с рождения пришивать маски к лицу."
    ];

    function w(intro, subject, action, provider, requested, message, is, content, soon, result) {
      let text = '';
      let args = arguments;
      for (let a in args) {
        let words = args[a];
        let id = Math.floor(Math.random() * words.length);
        let word = words[id] || (id + ' ' + words);
        text += word + " ";
      }
      return text;
    }
    let phrase = w(intro, subject, action, provider, requested, message, is, content, soon, result);

    this.news += '\n\r\n\r' + phrase;

    return phrase;
  }

}
