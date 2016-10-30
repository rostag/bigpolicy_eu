import { BpProjectPage } from './app.po';

describe('bp-project App', function() {
  let page: BpProjectPage;

  beforeEach(() => {
    page = new BpProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
