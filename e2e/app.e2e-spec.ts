import { ScotchyScotchPage } from './app.po';

describe('ndfsm-frontend App', () => {
  let page: ScotchyScotchPage;

  beforeEach(() => {
    page = new ScotchyScotchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
