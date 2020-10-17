import { Injectable } from '@angular/core';
import { dumyMoiDumy, wordNumbers, wordsOfPyro, wordsWithGG } from '../models/poetry.model';
import { kobzar } from '../models/poetry.model.kob';

/**
 * Poetry backlog:
 * 
 * UI Constrols:
 * 
 *  - Rhythm selector
 *  - Model selector
 *  - Full-auto (animated) mode
 * 
 * Re-mixing on different levels:
 *  - Letters
 *  - Syllables
 *  - Words
 *  - Lines
 */

export const str = {
    wordsWithGG: wordsWithGG,
    dumyMoiDumy: dumyMoiDumy,
    wordsOfPyro: wordsOfPyro,
    kobzar: kobzar,
    wordNumbers: wordNumbers,
};

@Injectable()
export class PoetryService {

    private dics: any = {};

    public getDicByName(
        dictionaryName: any,
        sectionSeparator = '\n\n',
        linesSeparator = '\n',
        wordsSeparator = ' ',
        syllablesSeparator = null,
    ) {
        const existingDictionary = this.dics[dictionaryName];
        if (!existingDictionary) {
            const multilineString = dictionaryName;
            let newDictionary = [];
            const sections = multilineString.split(sectionSeparator);
            sections.forEach(section => {
                const lines = section.split(linesSeparator);
                lines.forEach(line => {
                    const words = line.trim();
                    const syllables = words.split(wordsSeparator);
                    syllables.forEach((value, index, array) => {
                        array[index] = this.cleanWord(value, syllablesSeparator);
                    });
                    newDictionary = newDictionary.concat(syllables);
                })
            });
            this.dics[dictionaryName] = newDictionary;
        }
        return this.dics[dictionaryName];
    }

    public cleanWord(word: string, syllablesSeparator = null): string {
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
}