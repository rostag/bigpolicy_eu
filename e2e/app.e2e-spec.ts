import { GenTestPage } from './app.po';

describe('gen-test App', () => {
  let page: GenTestPage;

  beforeEach(() => {
    page = new GenTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
