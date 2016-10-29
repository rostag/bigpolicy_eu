import { BpMigrationProjectPage } from './app.po';

describe('bp-migration-project App', function() {
  let page: BpMigrationProjectPage;

  beforeEach(() => {
    page = new BpMigrationProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
