import { Injectable } from '@angular/core';
import { ham } from '../models/ham';
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

export interface DictionaryVO {
    name: string;
    dictionary: any;
}

@Injectable()
export class PoetryService {

    private dics: any = {};

    public getDicFromString(
        dictionaryName: any,
        sectionSeparator = '\n\n',
        linesSeparator = '\n',
        wordsSeparator = ' ',
        syllablesSeparator = null,
    ): DictionaryVO {
        const existingDictionary = this.dics[dictionaryName];
        if (!existingDictionary) {
            const multilineString = dictionaryName.value;
            const newDictionaryVO = {
                name: dictionaryName.name,
                dictionary: [],
            }
            const sections = multilineString.split(sectionSeparator);
            sections.forEach(section => {
                const lines = section.split(linesSeparator);
                lines.forEach(line => {
                    const words = line.trim();
                    const syllables = words.split(wordsSeparator);
                    syllables.forEach((value, index, array) => {
                        array[index] = this.cleanWord(value, syllablesSeparator);
                    });
                    // newDictionary = newDictionary.concat(syllables);
                    newDictionaryVO.dictionary = newDictionaryVO.dictionary.concat(syllables);
                })
            });
            this.dics[dictionaryName] = newDictionaryVO;
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