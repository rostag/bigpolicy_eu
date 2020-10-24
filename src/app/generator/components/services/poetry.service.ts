import { Injectable } from '@angular/core';
import { cleanUpWord } from 'app/generator/generator-helpers';
import { DictionarySource, dictonarySource } from '../models/poetry.model';

/**
 * Poetry backlog:
 * 
 * OOPO:
 * Words are interactive objects:
 *  - U can click a word to replace it
 *  - U can click a line to replace it
 *  - Real rhyming
 *  - Punctuation ('—', '₴') generation
 *  - Add sequencing word generation like ('наї' / 'заї') + ('ба') + ('в' || 'ла' || 'ло' || 'ли' || 'ло')
 * 
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

export interface WordProto {
    content: string,
}

export interface Word {
    wordContents: string,
};

export interface Dictionary {
    name: string;
    words: Word[];
}

@Injectable()
export class PoetryService {

    private dictionaries: Dictionary[] = [];

    public setupDictionaries() {
        this.dictionaries = [
            // this.createDictionaryFromSource(dictonarySource.kob, '\n\n', '\n', ' '),
            this.createDictionaryFromSource(dictonarySource.mat),
            this.createDictionaryFromSource(dictonarySource.dumyLat, '\n\n', '\n', ' ', '-'),
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
        let dictionaryWords: Word[] = [];
        sections.forEach(section => {
            const lines = section.split(linesSeparator);
            lines.forEach(line => {
                const lineOfWords = line.trim();
                const words = lineOfWords.split(wordsSeparator);
                const superstrings: Word[] = [];
                words.forEach((word, index, wordsArray) => {
                    const wordCleanedUp = cleanUpWord(word, syllablesSeparator)
                    wordsArray[index] = wordCleanedUp;
                    const superstring: Word = {wordContents: wordCleanedUp };
                    superstrings.push(superstring)
                });
                dictionaryWords = dictionaryWords.concat(superstrings);
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
    //                     array[index] = this.cleanUpWord(syllable, syllablesSeparator);
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
}