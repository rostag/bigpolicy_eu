import { Injectable } from '@angular/core';
import { dumyMoiDumy, kobzar, wordNumbers, wordsOfPyro, wordsWithGG } from '../models/poetry.model';

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

export enum DictionaryNames {
    'wordsWithGG' = 'wordsWithGG',
    'dumyMoiDumy' = 'dumyMoiDumy',
    'wordsOfPyro' = 'wordsOfPyro',
    'kobzar' = 'kobzar',
    'wordNumbers' = 'wordNumbers',
};

export const stringsByDictionaryName = {
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
        dictionaryName: DictionaryNames,
        sectionSeparator = '\n\n',
        linesSeparator = '\n',
        wordsSeparator = ' ',
        syllablesSeparator = null,
    ) {
        const existingDictionary = this.dics[dictionaryName];
        if (!existingDictionary) {
            const multilineString = stringsByDictionaryName[dictionaryName];
            let newDictionary = [];
            const sections = multilineString.split(sectionSeparator);
            sections.forEach(section => {
                const lines = section.split(linesSeparator);
                lines.forEach(line => {
                    const words = line.trim();
                    // words cleanup
                    const syllables = words.split(wordsSeparator);
                    syllables.forEach((value, index, array) => {
                        let r = value.replace(/«/gi, '');
                        r = r.replace(/»/gi, '');
                        r = r.replace(/\?/gi, '');
                        r = r.replace(/\./gi, '');
                        r = r.replace(/!/gi, '');
                        r = r.replace(/"/gi, '');
                        r = r.replace(/\)/gi, '');
                        r = r.replace(/\(/gi, '');
                        r = r.replace(/\[/gi, '');
                        r = r.replace(/\]/gi, '');
                        // r = r.replace(/,/gi, '');
                        if (syllablesSeparator) {
                            r = r.replace(/-/g, '');
                        }
                        array[index] = r.toLowerCase();
                    });
                    newDictionary = newDictionary.concat(syllables);
                })
            });
            this.dics[dictionaryName] = newDictionary;
        }
        return this.dics[dictionaryName];
    }
}