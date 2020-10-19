import { Injectable } from '@angular/core';
import { DictionarySource, dictonarySource } from '../models/poetry.model';
import { Rhythm } from '../models/rythm.models';

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
    dictionary: string[];
}

@Injectable()
export class PoetryService {

    private dictionaries: DictionaryVO[] = [];
    private rhyme: Rhythm[] = [];

    public setupDictionaries() {
        this.dictionaries = [
            // this.createDictionaryFromSource(dictonarySource.kob, '\n\n', '\n', ' '),
            this.createDictionaryFromSource(dictonarySource.gg, '--SECTION-->'),
            this.createDictionaryFromSource(dictonarySource.dumy, '\n\n', '\n', ' ', '-'),
            this.createDictionaryFromSource(dictonarySource.pyro, '\n\n', '\n', ' '),
            this.createDictionaryFromSource(dictonarySource.numbers, '\n\n', '\n', ' '),
            this.createDictionaryFromSource(dictonarySource.ham, '\n\n', '\n', ' '),
        ]
        console.log('Dictionaries:', this.dictionaries);
        return this.dictionaries;
    }

    public getDictionaryByName(name: string) {
        const dicByName = this.dictionaries.find(d => d.name === name) || this.dictionaries[0];
        console.log('Dic by name', name, dicByName);
        return dicByName;
    }

    public createDictionaryFromSource(
        dictionarySource: DictionarySource,
        sectionSeparator = '\n\n',
        linesSeparator = '\n',
        wordsSeparator = ' ',
        syllablesSeparator = null,
    ): DictionaryVO {
        const dictionaryName = dictionarySource.name;
        const multilineString = dictionarySource.value;
        const sections = multilineString.split(sectionSeparator);
        let dictionary: string[] = [];
        sections.forEach(section => {
            const lines = section.split(linesSeparator);
            lines.forEach(line => {
                const words = line.trim();
                const syllables = words.split(wordsSeparator);
                syllables.forEach((syllable, index, array) => {
                    array[index] = this.cleanWord(syllable, syllablesSeparator);
                });
                dictionary = dictionary.concat(syllables);
            })
        });
        this.dictionaries[dictionaryName] = {
            name: dictionarySource.name,
            dictionary: dictionary,
        };
        console.log('New dic:', this.dictionaries[dictionaryName]);
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