import { latynka } from './components/models/latynka.model';

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
        return getRandomFromSet(set);;
    }
};

let getRandomWordOfGivenLengthCallCount = 0;

export function getRandomWordOfGivenLength(dic: string[], wordLength: number, transformVowels = false, removeWordsFromDic = false): string {
  const vowels = 'їёуэеиаоєяіиюыєeuioay';
  const randomWord = getRandomFromSet(dic);
  let syllablesCount = 0;
  randomWord.split('').forEach(char => {
    syllablesCount += vowels.split('').includes(char) ? 1 : 0;
  })
  if (syllablesCount === wordLength || getRandomWordOfGivenLengthCallCount > 100) {
    // console.log(':', callStack, syllablesCount, randomWord);
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
    getRandomWordOfGivenLengthCallCount = 0;
    return w;
  } else {
    getRandomWordOfGivenLengthCallCount++;
    return getRandomWordOfGivenLength(dic, wordLength);
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
