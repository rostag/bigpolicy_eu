import { latynka } from './components/models/latynka.model';
import { Word } from './components/services/poetry.service';

export function latynize(str: string): string {
    Object['entries'](latynka).forEach(letter => str = str.replace(new RegExp(letter[0], 'g'), letter[1]));
    return str
}

export function getRandomFromSet(set: any[]) {
    const result = set[Math.round(Math.random() * set.length - 1)];
    if (!!result || getRandomFromSet['callCount'] > 1000) {
        // console.log('-', result, getRandomFromSet['callCount'] );
        getRandomFromSet['callCount'] = 0;
        return result || '';
    } else {
        getRandomFromSet['callCount'] = getRandomFromSet['callCount'] + 1;
        return getRandomFromSet(set);
    }
};

let getRandomWordOfGivenLengthCallCount = 0;

export function getRandomWordOfGivenLength(words: Word[], targetWordLength: number, transformVowels = false, removeWordsFromDic = false): Word {
  const vowels = 'їёуэеиаоєяіиюыєeuioay';
  const randomWord: Word = getRandomFromSet(words);
  let syllablesCount = 0;
  randomWord.wordContents.split('').forEach(char => {
    syllablesCount += vowels.split('').includes(char) ? 1 : 0;
  })
  if (syllablesCount === targetWordLength || getRandomWordOfGivenLengthCallCount > 100) {
    // console.log(':', callStack, syllablesCount, randomWord);
    if (removeWordsFromDic) {
      words.splice(words.indexOf(randomWord), 1);
    }
    let w = randomWord.wordContents;
    if (transformVowels) {
      w = w
        .replace(/ї/g, 'Ї').replace(/ё/g, 'Ё').replace(/у/g, 'У')
        .replace(/э/g, 'Э').replace(/е/g, 'Е').replace(/и/g, 'И')
        .replace(/о/g, 'О').replace(/є/g, 'Є').replace(/а/g, 'А')
        .replace(/я/g, 'Я').replace(/і/g, 'І').replace(/ю/g, 'Ю')
        .replace(/ы/g, 'Ы');
    }
    getRandomWordOfGivenLengthCallCount = 0;
    randomWord.rhymeWordLength = targetWordLength;
    return randomWord;
  } else {
    getRandomWordOfGivenLengthCallCount++;
    return getRandomWordOfGivenLength(words, targetWordLength);
  }
}

export function getRandomName(dictionary: string[]) {
    const key: string = getRandomFromSet(dictionary);
    const randomLen = Math.min(Math.max(Math.floor(Math.random() * key.length), 4), 10);
    return (
        key[Math.floor(Math.random() * key.length)].toUpperCase() +
        key
            .substr(key.length - randomLen)
            .toLowerCase()
            .replace(/_/g, ' ')
    );
};

export function getRandomSequence(dictionary, wordCount) {
    let result = '',
        i = 0;
    do {
        result += getRandomName(dictionary.words) + ' ';
        i++;
    } while (i < wordCount);
    return result;
};

export function cleanUpWord(word: string, syllablesSeparator = null): string {
  let r = word.replace(/«/gi, '');
  r = r.replace(/»/gi, '');
  r = r.replace(/\?/gi, '');
  r = r.replace(/\./gi, '');
  r = r.replace(/!/gi, '');
  r = r.replace(/"/gi, '');
  r = r.replace(/\)/gi, '');
  r = r.replace(/\(/gi, '');
  r = r.replace(/\[/gi, '');
  r = r.replace(/\]/gi, '');
  r = r.replace(/\:/gi, '');
  r = r.replace(/\;/gi, '');
  r = r.replace(/\,/gi, '');
  r = r.replace(/\—/gi, '');
  if (syllablesSeparator) {
      r = r.replace(/-/g, '');
  }
  return r.toLowerCase();
  // return r;
}
