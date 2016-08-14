import { Injectable } from '@angular/core';

@Injectable()
export class localStorage {

  constructor() {
  }

  // FIXME Connect it to real local storage
  static items = {'auth_token': true};

  // FIXME Connect it to real local storage
  static getItem(item) {
    console.log('localStorage, getItem:', item, localStorage.items[item])
    return localStorage.items[item];
  }

  // FIXME Connect it to real local storage
  static setItem(item, value) {
    localStorage.items[item] = value;
  }

  // FIXME Connect it to real local storage
  static removeItem(item) {
    localStorage.items[item] = null;
  }
}
