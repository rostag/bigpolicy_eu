import { latynka } from './components/models/latynka.model';

export function latynize(str: string): string {
    Object['entries'](latynka).forEach(letter => str = str.replace(new RegExp(letter[0], 'g'), letter[1]));
    return str
}
