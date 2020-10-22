import { Injectable } from '@angular/core';
import { DictionarySource, dictonarySource } from '../models/poetry.model';
import { Rhyme } from '../models/rythm.models';

/**
 * Poetry backlog:
 * 
 * Words are interactive objects:
 *  - U can click a word to replace it
 *  - U can click a line to replace it
 * 
 * UI Controls:
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

export interface Dictionary {
    name: string;
    words: string[];
}

@Injectable()
export class PoetryService {

    private dictionaries: Dictionary[] = [];

    public setupDictionaries() {
        this.dictionaries = [
            // this.createDictionaryFromSource(dictonarySource.kob, '\n\n', '\n', ' '),
            this.createDictionaryFromSource(dictonarySource.dumy, '\n\n', '\n', ' ', '-'),
            this.createDictionaryFromSource(dictonarySource.mat),
            this.createDictionaryFromSource(dictonarySource.ham),
            this.createDictionaryFromSource(dictonarySource.roz),
            this.createDictionaryFromSource(dictonarySource.gg, '--SECTION-->'),
            this.createDictionaryFromSource(dictonarySource.pyro),
            this.createDictionaryFromSource(dictonarySource.numbers),
        ]
        return this.dictionaries;
    }

    public getDictionaryByName(name: string) {
        const dictionaryByName = this.dictionaries.find(d => d.name === name) || this.dictionaries[0];
        return dictionaryByName;
    }

    public createDictionaryFromSource(
        dictionarySource: DictionarySource,
        sectionSeparator = '\n\n',
        linesSeparator = '\n',
        wordsSeparator = ' ',
        syllablesSeparator = null,
    ): Dictionary {
        const dictionaryName = dictionarySource.name;
        const multilineString = dictionarySource.value;
        const sections = multilineString.split(sectionSeparator);
        let dictionaryWords: string[] = [];
        sections.forEach(section => {
            const lines = section.split(linesSeparator);
            lines.forEach(line => {
                const lineWords = line.trim();
                const syllables = lineWords.split(wordsSeparator);
                syllables.forEach((syllable, index, array) => {
                    array[index] = this.cleanWord(syllable, syllablesSeparator);
                });
                dictionaryWords = dictionaryWords.concat(syllables);
            })
        });
        this.dictionaries[dictionaryName] = <Dictionary>{
            name: dictionarySource.name,
            words: dictionaryWords,
        };
        return this.dictionaries[dictionaryName];
    }

    // public getDictionaryFromString(
    //     dictionarySource: any,
    //     sectionSeparator = '\n\n',
    //     linesSeparator = '\n',
    //     wordsSeparator = ' ',
    //     syllablesSeparator = null,
    // ): DictionaryVO {
    //     // const existingDictionary = this.dictionaries.some(dictionary => dictionary.n);
    //     console.log('dic src:', dictionarySource);
    //     console.log('ex dic:', existingDictionary);
    //     if (!existingDictionary) {
    //         const multilineString = dictionarySource.value;
    //         const newDictionaryVO = {
    //             name: dictionarySource.name,
    //             dictionary: [],
    //         }
    //         const sections = multilineString.split(sectionSeparator);
    //         sections.forEach(section => {
    //             const lines = section.split(linesSeparator);
    //             lines.forEach(line => {
    //                 const words = line.trim();
    //                 const syllables = words.split(wordsSeparator);
    //                 syllables.forEach((syllable, index, array) => {
    //                     array[index] = this.cleanWord(syllable, syllablesSeparator);
    //                 });
    //                 // newDictionary = newDictionary.concat(syllables);
    //                 newDictionaryVO.dictionary = newDictionaryVO.dictionary.concat(syllables);
    //             })
    //         });
    //         this.dics[dictionarySource] = newDictionaryVO;
    //     }
    //     console.log('Return dic:', this.dics[dictionarySource]);
    //     return this.dics[dictionarySource];
    // }

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