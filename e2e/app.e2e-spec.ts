import { BpAppPage } from './app.po';

describe('bp-app App', function() {
  let page: BpAppPage;

  beforeEach(() => {
    page = new BpAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
