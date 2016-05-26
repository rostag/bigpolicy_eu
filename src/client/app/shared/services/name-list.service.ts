export class NameListService {

  // FIXME
  names = [
      'Василь Василенко',
      'Світлана Світленко'
  ];

  get(): string[] {
    return this.names;
  }
  add(value: string): void {
    this.names.push(value);
  }
}
